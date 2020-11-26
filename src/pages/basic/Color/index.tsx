import React, { FC, useEffect } from 'react';
import styles from './index.less';

const Color: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.getElementById('color');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource = `
        // attribute声明vec4类型变量apos
        attribute vec4 apos;

        // attribute声明顶点颜色变量
        attribute vec4 a_color;

        // varying 声明顶点颜色差值后变量
        varying vec4 v_color;


        void main(){
            // 顶点坐标apos赋值给内置变量 gl_Position
            gl_Position = apos; 

            // 顶点颜色差值
            v_color = a_color;
        }
      `;

    // 片元着色器
    let fragShaderSource = `
      // 所有 float 类型数据 精度是 lowp;
      precision lowp float;
      // 接受顶点着色器中 v_color数据。

      varying vec4 v_color;

        void main(){
          // 颜色差值后数据赋值给对应片元
            gl_FragColor = v_color;
        }
    `;

    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    // 开始绘制显示结果

    // 获取顶点着色器的位置变量apos, 即aposLocation指向apos变量。
    let aposLocation = gl?.getAttribLocation(program, 'apos');
    let a_color = gl?.getAttribLocation(program, 'a_color');

    /**
     创建顶点位置数据数组data，存储两个顶点(-0.5,0.5、(0.5,0.5)
     创建顶点颜色数组colorData，存储两个顶点对应RGB颜色值(0,0,1)、(1,0,0)
     **/
    // var data=new Float32Array([-0.5,0.5,0.5,0.5,0.5,-0.5]);
    // var colorData = new Float32Array([1,0,0,0,1,0,0,0,1]);

    var data = new Float32Array([
      -0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      -0.5, //第一个三角形的三个点
      -0.5,
      0.5,
      0.5,
      -0.5,
      -0.5,
      -0.5, //第二个三角形的三个点
    ]);
    var colorData = new Float32Array([
      1,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1, //三个红色点
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1, //三个蓝色点
    ]);

    /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
     **/
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);
    /**
     创建缓冲区buffer，传入顶点位置数据data
     **/
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aposLocation);

    /**执行绘制命令**/
    // gl.drawArrays(gl.LINES, 0, 2);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

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
      <canvas id="color" width="500" height="500" style={{ background: '#FFF' }}></canvas>
    </div>
  );
};

export default Color;
