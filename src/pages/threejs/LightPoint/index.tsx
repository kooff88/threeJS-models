import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });

const LightPoint: FC<{}> = () => {
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
    // 创建立方体几何对象geometry
    //let geometry = new THREE.SphereGeometry(60,40,40) // 球体几何体
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    }); // 材质material

    // 创建网格模型对象mesh
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh); // 网格模型添加到场景中

    /**
     * 光源设置
     */
    // 点光源
    let point1 = new THREE.PointLight(0xffffff);
    point1.position.set(400, 200, 300); // 点光源位置
    scene.add(point1); // 点光源添加到场景中

    // // 点光源2 ，与1对称
    // let point2 = new THREE.PointLight(0xffffff)
    // point2.position.set(-400,-200,-300);
    // scene.add(point2);

    // 点光源2 ，与1对称
    let point3 = new THREE.SpotLight(0xffffff);
    point3.position.set(-400, -200, -300);
    scene.add(point3);

    // 环境光
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    /**
     * 相机设置
     */
    let width = window.innerWidth; // 窗口宽高
    let height = window.innerHeight;
    let k = width / height; //宽高比
    let s = 150; // 三位场景中范围控制的系数，系数越大 显示范围越大。
    // 创建相机对象
    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); // 相机位置
    camera.lookAt(scene.position); // 设置相机方向，指向场景对象

    /**
     * 创建渲染器对象
     */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); // 蛇追渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色

    // 元素中插入canvas对象
    document.getElementById('lightPoint')?.appendChild(renderer.domElement);
    // 执行渲染操作,指定场景，相机作为参数
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
      <div id="lightPoint" />
    </div>
  );
};

export default LightPoint;
