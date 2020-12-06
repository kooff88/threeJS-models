import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const UseVertor: FC<{}> = () => {
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
    // 声明一个几何对象
    let geometry = new THREE.Geometry();

    let p1 = new THREE.Vector3(50, 0, 0); // 顶点1坐标
    let p2 = new THREE.Vector3(0, 70, 0); // 顶点2坐标
    let p3 = new THREE.Vector3(80, 70, 0); // 顶点3坐标

    // 顶点坐标添加到geometry
    geometry.vertices.push(p1, p2, p3);

    let color1 = new THREE.Color(0x00ff00);
    var color2 = new THREE.Color(0xff0000); //顶点2颜色——红色
    var color3 = new THREE.Color(0x0000ff); //顶点3颜色——蓝色

    // 颜色数据添加到geometry对象
    geometry.colors.push(color1, color2, color3);

    // 线模型
    var material = new THREE.LineBasicMaterial({
      // 使用顶点颜色数据渲染模型，不需要再定义color属性
      // color: 0xff0000,
      vertexColors: THREE.VertexColors, //以顶点颜色为准
    });

    let line = new THREE.Line(geometry, material);
    scene.add(line);

    // 辅助坐标系 AxisHelper
    let axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

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
    document.getElementById('useVertor')?.appendChild(renderer.domElement);
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
      <div id="useVertor" />
    </div>
  );
};

export default UseVertor;
