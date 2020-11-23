import React, { FC, useEffect } from 'react';
import styles from './index.less';

const Point: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.querySelector('canvas');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource = `
            void main(){
                // 给内置变量赋值像素大小
                 gl_PointSize  = 20.0; 
                 //定点位置， 位于坐标原点
                 gl_Position = vec4(0.0, 0.0, 0.0, 1.0); 
            }
        `;

    // 片元着色器
    let fragShaderSource = `
            void main(){
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;

    // 初始化着色器
    function initShader(gl: any, vertexShaderSource: any, fragShaderSource: any) {
      console.log('gl', gl);
      console.log('vertexShaderSource', vertexShaderSource);
      console.log('fragShaderSource', fragShaderSource);

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

    initShader(gl, vertexShaderSource, fragShaderSource);
    // 开始绘制显示结果
    gl?.drawArrays(gl.POINTS, 0, 1);
  };

  return (
    <div className={styles.container}>
      <canvas id="webgl" width="500" height="500" style={{ background: 'blue' }}></canvas>
    </div>
  );
};

export default Point;
