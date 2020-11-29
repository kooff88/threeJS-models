import React, { FC, useEffect } from 'react';
import styles from './index.less';

const Rotate: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // let canvas = document.getElementById('webgl');
    let canvas = document.getElementById('rotate');
    console.log('canvas', canvas);
    let gl = canvas?.getContext('webgl');
    console.log('gl', gl);

    // 顶点着色器源码
    let vertexShaderSource = `
        //attribute声明vec4类型变量apos
        attribute vec4 apos;
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
          gl_Position = mx*my*apos;
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
    let a_normal = gl?.getAttribLocation(program, 'a_normal');
    let u_lightColor = gl?.getUniformLocation(program, 'u_lightColor');
    let u_lightDirection = gl?.getUniformLocation(program, 'u_lightDirection');

    /***
     *  从program对象获取旋转矩阵变量mx,my地址
     */
    let mx = gl.getUniformLocation(program, 'mx');
    let my = gl.getUniformLocation(program, 'my');

    /***
     *  给平行光传入颜色和方向数据RGB(1,1,1), 单位向量(x,y,z);
     */
    gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
    //保证向量(x,y,z)的长度为1，即单位向量
    var x = 1 / Math.sqrt(15),
      y = 2 / Math.sqrt(15),
      z = 3 / Math.sqrt(15);
    gl.uniform3f(u_lightDirection, x, y, -z);

    /**
     创建顶点位置数据数组data,Javascript中小数点前面的0可以省略
     **/
    var data = new Float32Array([
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

    /**
     *顶点法向量数组normalData
     **/
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

    /**
      创建缓冲区normalBuffer，传入顶点法向量数据normalData
    **/
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_normal);

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

    /** 绕x轴旋转45度**/
    var mxArr = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      Math.cos(Math.PI / 4),
      -Math.sin(Math.PI / 4),
      0,
      0,
      Math.sin(Math.PI / 4),
      Math.cos(Math.PI / 4),
      0,
      0,
      0,
      0,
      1,
    ]);

    // 把数据mxArr 传递给着色器旋转矩阵mx
    gl.uniformMatrix4fv(mx, false, mxArr);

    /**
     * 定义绘制函数draw()，定时更新旋转矩阵数据，并调用WebGL绘制API
     ***/
    let angle = Math.PI / 4; //起始角度
    function draw() {
      // 立方体绕y轴旋转
      angle += 0.01; // 每次渲染角度增加,每次渲染角度不同
      let sin = Math.sin(angle); // 旋转角度正弦
      let cos = Math.cos(angle); // 旋转角度余弦
      let myArry = new Float32Array([cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1]);

      gl.uniformMatrix4fv(my, false, myArry);
      requestAnimationFrame(draw);
      /* 绘制执行命令*/
      gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    draw();

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
      <canvas id="rotate" width="500" height="500" style={{ background: '#0d72da' }}></canvas>
    </div>
  );
};

export default Rotate;
