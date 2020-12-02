import React, { FC, useEffect } from 'react';
import pic from './glb.jpg';
import styles from './index.less';

const Chartlet: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.getElementById('chartlet');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource1 = `
      attribute vec4 a_Position; // 顶点位置坐标
      attribute vec2 a_TexCoord; // 纹理坐标
      varying vec2 v_TexCoord;  // 插值后纹理坐标
      /**uniform声明旋转矩阵变量mx,my**/
      uniform mat4 mx; // 绕x轴旋转矩阵
      uniform mat4 my; // 绕y轴旋转矩阵
        void main() {
          //旋转矩阵，顶点齐次矩阵相乘
          gl_Position = mx*my*a_Position;
          //纹理坐标插值计算
          v_TexCoord = a_TexCoord;
        }
    `;

    // 片元着色器
    let fragShaderSource1 = `
      // 所有float类型数据的精度是highp
      precision highp float;
      // 接受插值后的纹理坐标
      varying vec2 v_TexCoord;
      // 纹理图片像素数据
      uniform sampler2D u_Sampler;
        void main() {
          // 逐片元处理数据，所有片元(像素)设置为红色
          gl_FragColor = texture2D(u_Sampler, v_TexCoord);
        }
    `;

    let vertexShaderSource2 = `
    //attribute声明vec4类型变量apos
    attribute vec4 a_Position;
    // attribute声明顶点颜色变量
    attribute vec4 a_color;
    //顶点法向量变量
    attribute vec4 a_normal;
    // uniform声明平行光颜色变量
    uniform vec3 u_lightColor;
    //平行光方向
    uniform vec3 u_lightDirection;
    //varying声明顶点颜色插值后变量
    varying vec4 v_color;
    /**uniform声明旋转矩阵变量mx、my**/
    uniform mat4 mx;//绕x轴旋转矩阵
    uniform mat4 my;//绕y轴旋转矩阵
    void main() {
      //两个旋转矩阵、顶点齐次坐标连乘
      gl_Position = mx*my*a_Position;
      // 顶点法向量进行矩阵变换，然后归一化
      vec3 normal = normalize((mx*my*a_normal).xyz);
      // 计算平行光方向向量和顶点法向量的点积
      float dot = max(dot(u_lightDirection, normal), 0.0);
      // 计算反射后的颜色
      vec3 reflectedLight = u_lightColor * a_color.rgb * dot;
      //颜色插值计算
      v_color = vec4(reflectedLight, a_color.a);
    }
    `;

    let fragShaderSource2 = `
        // 所有float 类型数据的精度是lowp
        precision lowp float;
        // 接受顶点着色器中v_color数据
        varying vec4 v_color;
        void main(){
          // 插值后颜色数据赋值给对应的片元
          gl_FragColor = v_color;
        }
    `;

    let program1 = initShader(gl, vertexShaderSource1, fragShaderSource1);
    let program2 = initShader(gl, vertexShaderSource2, fragShaderSource2);

    /**着色器1对应的变量地址**/
    var texturePosition = gl.getAttribLocation(program1, 'a_Position');
    let a_TexCoord = gl?.getAttribLocation(program1, 'a_TexCoord');
    let u_Sampler = gl?.getUniformLocation(program1, 'u_Sampler');
    let textureMx = gl?.getUniformLocation(program1, 'mx'); // 旋转矩阵mx
    let textureMy = gl?.getUniformLocation(program1, 'my');
    /**着色器2对应的变量地址**/
    let cubePosition = gl.getAttribLocation(program2, 'a_Position');
    let a_color = gl.getAttribLocation(program2, 'a_color');
    let a_normal = gl.getAttribLocation(program2, 'a_normal');
    let u_lightColor = gl.getUniformLocation(program2, 'u_lightColor');
    let u_lightDirection = gl.getUniformLocation(program2, 'u_lightDirection');
    let cubeMx = gl.getUniformLocation(program2, 'mx');
    let cubeMy = gl.getUniformLocation(program2, 'my');

    /**
     * 纹理映射，立方体公用的旋转矩阵数据
     */
    let angle = Math.PI / 6; // 起始角度
    let sin = Math.sin(angle); // 旋转角正弦
    let cos = Math.cos(angle); // 旋转角余弦

    /**绕x轴旋转30度**/
    var mxArr = new Float32Array([1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1]);
    /**绕y轴旋转30度**/
    var myArr = new Float32Array([cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1]);
    /**立方体顶点位置数据数组data**/
    var cubeData = new Float32Array([
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      0.5, //面1
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5, //面2
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      0.5, //面3
      -0.5,
      0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5, //面4
      -0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5, //面5
      0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.5,
      0.5,
      -0.5, //面6
    ]);
    /**立方体顶点颜色数组colorData**/
    var colorData = new Float32Array([
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //红色——面1
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //红色——面2
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //红色——面3
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //红色——面4
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //红色——面5
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //红色——面6
    ]);
    /**立方体顶点法向量数组normalData**/
    var normalData = new Float32Array([
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1, //z轴正方向——面1
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0, //x轴正方向——面2
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0, //y轴正方向——面3
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0, //x轴负方向——面4
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0, //y轴负方向——面5
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1, //z轴负方向——面6
    ]);
    /**纹理映射顶点数据**/
    var data = new Float32Array([
      -0.5,
      0.4,
      -0.61, //左上角——v0
      -0.5,
      -0.4,
      -0.61, //左下角——v1
      0.5,
      0.4,
      -0.61, //右上角——v2
      0.5,
      -0.4,
      -0.61, //右下角——v3
      // 0.4, -0.2,-0.51//右下角——v3
    ]);
    /**UV纹理坐标数据textureData**/
    var textureData = new Float32Array([
      0,
      1, //左上角——uv0
      0,
      0, //左下角——uv1
      1,
      1, //右上角——uv2
      1,
      0, //右下角——uv3
    ]);
    /**加载纹理图像数据**/
    let image = new Image();
    image.onload = texture;
    image.src = pic;

    /**
     * 渲染管线功能配置
     **/
    gl.enable(gl.DEPTH_TEST); //开启深度测试

    /**
     创建缓冲区textureBuffer，传入图片纹理数据，然后执行绘制方法drawArrays()
     **/
    function texture() {
      var texture = gl.createTexture(); //创建纹理图像缓冲区
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
      gl.activeTexture(gl.TEXTURE0); //激活0号纹理单元TEXTURE0
      gl.bindTexture(gl.TEXTURE_2D, texture); //绑定纹理缓冲区
      //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      //设置纹素格式，png格式对应gl.RGBA
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      /**
       执行useProgram()方法，GPU执行纹理映射着色器程序
       **/
      gl.useProgram(program1);
      /**调用函数vertexBuffer()，配置顶点数据**/
      vertexBuffer(data, texturePosition, 3);
      vertexBuffer(textureData, a_TexCoord, 2);
      /**传入纹理图片旋转矩阵数据**/
      gl.uniformMatrix4fv(textureMy, false, myArr);
      gl.uniformMatrix4fv(textureMx, false, mxArr);
      gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
      /**执行绘制，纹理映射像素值存入颜色缓冲区**/
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      /**
       执行useProgram()方法，切换着色器程序，重新配置GPU执行立方体着色器程序
       **/
      gl.useProgram(program2);
      /**调用函数vertexBuffer()，配置顶点数据**/
      vertexBuffer(cubeData, cubePosition, 3);
      vertexBuffer(colorData, a_color, 3);
      vertexBuffer(normalData, a_normal, 3);
      /**传入立方体旋转矩阵数据**/
      gl.uniformMatrix4fv(cubeMx, false, mxArr);
      gl.uniformMatrix4fv(cubeMy, false, myArr);
      /**传入光的颜色和方向数据**/
      gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
      //保证向量(x,y,z)的长度为1，即单位向量
      var x = 1 / Math.sqrt(15),
        y = 2 / Math.sqrt(15),
        z = 3 / Math.sqrt(15);
      gl.uniform3f(u_lightDirection, x, y, -z);
      /**执行绘制，立方体像素值存入颜色缓冲区**/
      gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    /**
     * 顶点数据配置函数vertexBuffer()
     * 顶点数据data
     * 顶点位置position
     * 间隔数量n
     */
    function vertexBuffer(data: any, position: any, n: number) {
      let buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.vertexAttribPointer(position, n, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(position);
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

      // 使用program
      gl.useProgram(program);

      return program;
    }
  };

  return (
    <div className={styles.container}>
      <canvas id="chartlet" width="500" height="500" style={{ background: 'blue' }}></canvas>
    </div>
  );
};

export default Chartlet;
