import React, { FC, useEffect } from 'react';
import pic from './texture.jpg';
import styles from './index.less';

const Texture: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.getElementById('texture');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource = `
      attribute vec4 a_Position; // 顶点坐标位置
      attribute vec2 a_TexCoord; // 纹理坐标

      varying vec2 v_TexCoord; // 插值后纹理坐标
      void main(){
        gl_Position = a_Position; 
        /**
         * 纹理插值计算, atrribute 声明的顶点坐标赋值给 attribute声明的变量时，该顶点数据在进行顶点光栅化时会进行插值计算，
         * 不论颜色数据还是纹理数据
         */ 
        v_TexCoord = a_TexCoord;
      }
    `;

    // 片元着色器
    let fragShaderSource = `
      //所有float类型数据的精度是highp
      precision highp float;
      // 接收插值后的纹理坐标
      varying vec2 v_TexCoord;
      // 纹理图片像素数据
      uniform sampler2D u_Sampler;
      void main() {
        // 采集纹素，逐片元赋值像素值
        gl_FragColor = texture2D(u_Sampler,v_TexCoord);
      }
    `;

    //初始化着色器
    let program = initShader(gl, vertexShaderSource, fragShaderSource);

    /**
     * 从program对象获取相关的变量
     * attribute变量声明的方法使用getAttribLocation()方法
     * uniform变量声明的方法使用getUniformLocation()方法
     **/

    let a_Position = gl?.getAttribLocation(program, 'a_Position');
    let a_TexCoord = gl?.getAttribLocation(program, 'a_TexCoord');
    let u_Sampler = gl?.getUniformLocation(program, 'u_Sampler');

    /**
     *  四个顶点坐标，z轴为0
     *  定义纹理贴图在Webgl坐标系的位置
     */

    let data = new Float32Array([
      -0.5,
      0.5, //左上角v0
      -0.5,
      -0.5, //左下角v1
      0.5,
      0.5, //右上角v3
      0.5,
      -0.5, //右下角v4
    ]);

    /***
     *  创建UV纹理坐标数据textureData
     */
    let textureData = new Float32Array([
      0,
      1, // 左上角uv0
      0,
      0, //左下角——uv1
      1,
      1, //右上角——uv2
      1,
      0, //右下角——uv3
    ]);

    // 加载纹理图像数据
    let image = new Image();

    image.src = pic;
    image.onload = texture;

    /**
     创建缓冲区buffer，向顶点着色器传入顶点位置数据data
     **/
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    /**
     *  创建缓冲区textureBuffer,向顶点着色器传入顶点纹理坐标textureData
     */
    let textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, textureData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_TexCoord);

    /**
     * 创建textureBuffer,传入图片纹理数据，然后执行drawArrays
     */

    function texture() {
      var texture = gl.createTexture(); //创建纹理图像缓冲区
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
      gl.activeTexture(gl.TEXTURE0); //激活0号纹理单元TEXTURE0
      gl.bindTexture(gl.TEXTURE_2D, texture); //绑定纹理缓冲区
      //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      //设置纹素格式，jpg格式对应gl.RGB
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
      // 进行绘制
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    // 初始化着色器
    function initShader(gl: any, vertexShaderSource: any, fragShaderSource: any) {
      // 创建顶点着色器对象
      let vertexShader = gl.createShader(gl.VERTEX_SHADER);
      // 创建片元着色器对象
      let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      // 引入 着色器 源码
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.shaderSource(fragmentShader, fragShaderSource);
      // 编译顶点，片元着色器
      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);
      // 创建程序对象
      let program = gl.createProgram();
      // 附着顶点着色器和片元着色器到progam
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      // 链接program
      gl.linkProgram(program);

      gl.useProgram(program);

      return program;
    }
  };

  return (
    <div className={styles.container}>
      <canvas id="texture" width="500" height="500" style={{ background: '#aaa' }}></canvas>
    </div>
  );
};

export default Texture;
