import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const Transform: FC<{}> = () => {
  useEffect(() => {
    showPic();
  }, []);

  // 加载图
  const showPic = () => {
    // 创建一个场景 Scene
    let scene = new THREE.Scene();

    /**
     * 创建网格模型
     **/
    // 创建一个buffer类型几何对象
    let geometry = new THREE.BoxGeometry(100, 100, 100); // 创建一个立方体
    // let geometry = new THREE.PlaneBufferGeometry(100,100); // 创建一个立方体

    // 几何体xyz方向都放大两倍
    geometry.scale(2, 2, 2);
    // 几何体沿着x轴平移50
    geometry.translate(70, 0, 0);
    // 几何体绕x轴旋转45度
    geometry.rotateX(Math.PI / 4);
    // geometry.rotateY(Math.PI / 4);
    // 偏移的几何体居中
    // geometry.center();

    console.log(geometry);
    console.log('几何体顶点位置数据', geometry.vertices);
    console.log('三角面数据', geometry.faces);

    // geometry.faces.pop();
    // geometry.faces.shift();

    // // 遍历几何体face属性
    // geometry.faces.forEach(face => {
    //   // 设置三角面face的三个顶点的颜色
    //   face.vertexColors = [
    //     new THREE.Color(0xffff00),
    //     new THREE.Color(0xff00ff),
    //     new THREE.Color(0x00ffff),
    //   ]

    // })

    //材质对象
    var material = new THREE.MeshBasicMaterial({
      // vertexColors:THREE.FaceColors
      color: 0x0000ff,
    });
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    // 辅助坐标系 AxisHelper
    let axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    /**
     * 相机设置
     */
    let width = window.innerWidth; // 窗口宽高
    let height = window.innerHeight;
    let k = width / height; //宽高比
    let s = 300; // 三位场景中范围控制的系数，系数越大 显示范围越大。
    // 创建相机对象
    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(300, 200, 300); // 相机位置
    camera.lookAt(scene.position); // 设置相机方向，指向场景对象

    /**
     * 创建渲染器对象
     */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); // 蛇追渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色

    // 元素中插入canvas对象
    document.getElementById('transform')?.appendChild(renderer.domElement);
    // 执行渲染操作,指定场景，相机作为参数
    const cameraControls = new CameraControls(camera, renderer.domElement);
    renderer.render(scene, camera);

    function render() {
      // snip
      // const delta = clock.getDelta();
      const hasControlsUpdated = cameraControls.update(1);
      requestAnimationFrame(render);
      // you can skip this condition to render though
      if (hasControlsUpdated) {
        renderer.render(scene, camera);
      }
    }
    render();
  };

  return (
    <div className={styles.container}>
      <div id="transform" />
    </div>
  );
};

export default Transform;
