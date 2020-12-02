import React, { FC, useEffect } from 'react';
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
        //attribute声明vec4类型变量apos
        attribute vec4 apos;
        void main() {
          //顶点坐标apos赋值给内置变量gl_Position
          //逐顶点处理数据
          gl_Position = apos;
        }
    `;

    // 片元着色器
    let fragShaderSource1 = `
    precision lowp float;// 所有float类型数据的精度是lowp
      // 声明一个颜色变量
       uniform vec4 u_Color;
        void main() {
          // 逐片元处理数据，所有片元(像素)设置为红色
          gl_FragColor = u_Color;
        }
    `;

    let program = initShader(gl, vertexShaderSource1, fragShaderSource1);

    // 获取顶点着色器的位置变量apos, 即aposLocation指向apos变量。
    let aposLocation = gl?.getAttribLocation(program, 'apos');

    // 获取片元着色器中u_Color;
    let u_Color = gl.getUniformLocation(program, 'u_Color');

    // 顶点数组
    let data = new Float32Array([
      0.5,
      0.5,
      -0.5,
      0.5,
      -0.5,
      -0.5,
      0.5,
      -0.5,
      0.3,
      0.3,
      -0.3,
      0.3,
      -0.3,
      -0.3,
      0.3,
      -0.3,
    ]);

    let buffer = gl.createBuffer();
    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 顶点数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    // 缓冲区的数据按照一定规律传递给顶点坐标apos
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
    // 允许数据传递
    gl.enableVertexAttribArray(aposLocation);

    /**传入光的颜色和方向**/
    gl.uniform4f(u_Color, 1.0, 0.0, 0.0, 1.0);
    // 开始绘制图像
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    /**传入光的颜色和方向数据**/
    gl.uniform4f(u_Color, 0.0, 0.0, 1.0, 1.0);
    //开始绘制图形
    gl.drawArrays(gl.LINE_LOOP, 4, 4);

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
