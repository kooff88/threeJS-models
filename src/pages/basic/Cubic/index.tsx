import React, { FC, useEffect } from 'react';
import styles from './index.less';

const Cubic: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.getElementById('cubic');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource = `
        // attribute声明vec4类型变量apos
        attribute vec4 apos;


        void main(){
        // 设置几何体旋转角度为30度 并把角度值转为弧度制
        float radian = radians(30.0);
        // 求旋转角度余弦值
        float cos = cos(radian);
        // 求旋转角度正弦值
        float sin = sin(radian);

        // 引用上面的计算数据，创建围绕x轴的旋转矩阵
        //  1    0      0      0
        //  0    cosα   sinα   0
        //  0    -sinα  cosα   0
        //  0    0      0      1

        mat4 mx = mat4( 1,0,0,0,    0,cos,-sin,0,   0,sin,cos,0,   0,0,0,1);

        // 引用上面的计算数据，创建围绕y轴的旋转矩阵
        // cosβ   0   sinβ    0
        //     0   1   0        0
        //-sinβ   0   cosβ    0
        //     0   0   0        1
        
        mat4 my = mat4(cos,0,-sin,0,   0,1,0,0,   sin,0,cos,0,    0,0,0,1 );

        // 两个旋转矩阵，顶点齐次坐标连乘。
        gl_Position = mx*my*apos;
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

    // 创建立方体的坐标
    let data = new Float32Array([
      // z为0.5时，xOy平面上的四个坐标
      0.5,
      0.5,
      1,
      -0.5,
      0.5,
      1,
      -0.5,
      -0.5,
      1,
      0.5,
      -0.5,
      1,

      //z为-0.5时，xOy平面上的四个点坐标
      0.5,
      0.5,
      -1,
      -0.5,
      0.5,
      -1,
      -0.5,
      -0.5,
      -1,
      0.5,
      -0.5,
      -1,

      // 上面两组坐标分别对应起来组成--对
      0.5,
      0.5,
      1,
      0.5,
      0.5,
      -1,

      -0.5,
      0.5,
      1,
      -0.5,
      0.5,
      -1,

      -0.5,
      -0.5,
      1,
      -0.5,
      -0.5,
      -1,

      0.5,
      -0.5,
      1,
      0.5,
      -0.5,
      -1,
    ]);

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

    // LINE_LOOP模式绘制前4个点
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    // LINE_LOOP模式第5个点开始绘制4个点
    gl.drawArrays(gl.LINE_LOOP, 4, 4);

    // LINES模式绘制最后8个点
    gl.drawArrays(gl.LINES, 8, 8);

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
      <canvas id="cubic" width="500" height="500" style={{ background: 'blue' }}></canvas>
    </div>
  );
};

export default Cubic;
