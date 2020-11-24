import React, { FC, useEffect } from 'react';
import styles from './index.less';

const Rect: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.getElementById('coordinate');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource = `
        // attribute声明vec4类型变量apos

            attribute vec4 apos;
            void main(){
                // 顶点坐标apos赋值给内置变量 gl_Position
                // 逐顶点处理数据
                 gl_Position = apos; 
            }
        `;

    // 片元着色器
    let fragShaderSource = `
            void main(){
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;

    let program = initShader(gl, vertexShaderSource, fragShaderSource);
    // 开始绘制显示结果

    // 获取顶点着色器的位置变量apos, 即aposLocation指向apos变量。
    let aposLocation = gl?.getAttribLocation(program, 'apos');

    // 9个元素构建三个顶点的xyz值
    let data = new Float32Array([0, 0, 1, 0, 1, 0, 1, 0, 0]);

    // 创建缓冲区对象
    let buffer = gl.createBuffer();

    // 绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // 顶点数据data 传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // 缓冲区数据按一定规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);

    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);

    // 开始绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 3);

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
      <canvas id="coordinate" width="500" height="500" style={{ background: 'blue' }}></canvas>
    </div>
  );
};

export default Rect;
