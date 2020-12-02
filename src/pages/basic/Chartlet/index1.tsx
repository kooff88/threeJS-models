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
        void main() {
          // 逐片元处理数据，所有片元(像素)设置为红色
          gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;

    // 顶点着色器源码
    let vertexShaderSource2 = `
        //attribute声明vec4类型变量apos
        attribute vec4 apos;
        void main() {
          //顶点坐标apos赋值给内置变量gl_Position
          //逐顶点处理数据
          gl_Position = apos;
        }
    `;

    // 片元着色器
    let fragShaderSource2 = `
        void main() {
          // 逐片元处理数据，所有片元(像素)设置为红色
          gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;

    let program1 = initShader(gl, vertexShaderSource1, fragShaderSource1);
    let program2 = initShader(gl, vertexShaderSource2, fragShaderSource2);
    // 开始绘制显示结果

    // 获取顶点着色器的位置变量apos, 即aposLocation指向apos变量。
    let aposLocation1 = gl?.getAttribLocation(program1, 'apos');
    let aposLocation2 = gl?.getAttribLocation(program2, 'apos');

    // 顶点数组
    let data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象,激活buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation1, 2, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation1);
    // 使用程序对象program1
    gl.useProgram(program1);
    //开始绘制图形
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    //类型数组构造函数Float32Array创建顶点数组
    var data2 = new Float32Array([0.3, 0.3, -0.3, 0.3, -0.3, -0.3, 0.3, -0.3]);
    //创建缓冲区对象
    var buffer2 = gl.createBuffer();
    //绑定缓冲区对象,激活buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data2, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation2, 2, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation2);
    // 使用程序对象program2
    gl.useProgram(program2);
    //开始绘制图形
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

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
