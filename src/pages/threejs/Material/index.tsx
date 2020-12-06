import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const Material: FC<{}> = () => {
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
    // 立方体网格模型
    var geometry1 = new THREE.BoxGeometry(100, 100, 100);
    var material1 = new THREE.MeshLambertMaterial({
      color: 0x0000ff, //材质颜色
      transparent: true,
      opacity: 0.5,
    }); //材质对象Material
    var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    scene.add(mesh1); //网格模型添加到场景中

    // 球体网格模型
    var geometry2 = new THREE.SphereGeometry(60, 40, 40);
    var material2 = new THREE.MeshLambertMaterial({
      color: 0xff00f,
      transparent: true,
      opacity: 0.1,
    });
    var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
    mesh2.translateY(120); //球体网格模型沿Y轴正方向平移100
    scene.add(mesh2);

    // 圆柱网格模型
    var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
    var material3 = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      specular: 0x4488ee,
      shininess: 12,
    });
    var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
    mesh3.translateX(120); //球体网格模型沿Y轴正方向平移100
    scene.add(mesh3); //

    // 辅助坐标系
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**
     * 光源设置
     */
    // 点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 200); // 点光源位置
    scene.add(point); // 点光源添加到场景中
    // 环境光
    let ambient = new THREE.AmbientLight(0x008000);
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
    document.getElementById('material')?.appendChild(renderer.domElement);
    const cameraControls = new CameraControls(camera, renderer.domElement);
    renderer.render(scene, camera);

    // 渲染函数
    // const clock = new THREE.Clock();
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
      <div id="material" />
    </div>
  );
};

export default Material;
