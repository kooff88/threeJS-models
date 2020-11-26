import React, { FC, useEffect } from 'react';
import styles from './index.less';

const CubicWithcolor: FC<{}> = () => {
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
          // 设置几何体旋转30度，并把角度值转为弧度值。
          float radian = radians(150.0);
          //求解旋转角度余弦值
          float cos = cos(radian);
          //求解旋转角度正弦值
          float sin = sin(radian);
          //引用上面的计算数据，创建绕x轴旋转矩阵
          // 1      0       0    0
          // 0   cosα   sinα   0
          // 0  -sinα   cosα   0
          // 0      0        0   1
          mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);
          //引用上面的计算数据，创建绕y轴旋转矩阵
          // cosβ   0   sinβ    0
          //     0   1   0        0
          //-sinβ   0   cosβ    0
          //     0   0   0        1
          mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);
          //两个旋转矩阵、顶点齐次坐标连乘
          gl_Position = mx*my*apos;
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

    //  创建顶点数据组data
    let data = new Float32Array([
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

    /**
        创建顶点颜色数组colorData
     **/
    let colorData = new Float32Array([
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
      0, //绿色——面2
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
      1, //蓝色——面3
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      0, //黄色——面4
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0, //黑色——面5
      1,
      0.5,
      0.5,
      1,
      0.5,
      0.5,
      1,
      0.5,
      0.5,
      1,
      0.5,
      0.5,
      1,
      0.5,
      0.5,
      1,
      0.5,
      0.5, //白色——面6
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
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aposLocation);

    /**执行绘制之前，一定要开启深度测试，以免颜色混乱**/
    gl.enable(gl.DEPTH_TEST);
    /**执行绘制命令**/
    gl.drawArrays(gl.TRIANGLES, 0, 36);

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

export default CubicWithcolor;
