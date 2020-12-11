import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const Shadow: FC<{}> = () => {
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
    let geometry = new THREE.BoxGeometry(50, 50, 50);
    let material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    });

    let mesh = new THREE.Mesh(geometry, material); // 网络模型对象Mesh
    scene.add(mesh);
    mesh.castShadow = true;

    // 创建一个平面几何体作为投影面
    let planeGeometry = new THREE.PlaneGeometry(300, 200);
    let planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x999999,
    });

    // 平面网格对象作为投影面
    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    planeMesh.receiveShadow = true;
    planeMesh.rotateX(-Math.PI / 2);
    planeMesh.position.y = -25;

    //环境光   环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    var ambient = new THREE.AmbientLight(0x444444);
    ambient.intensity = 1.2;
    scene.add(ambient); //环境光对象添加到scene场景中

    //  聚光灯光源
    let spotLight = new THREE.SpotLight(0xffffff);
    // 设置聚光灯位置
    spotLight.position.set(50, 90, 50);
    // 设置聚光灯光源发散角
    spotLight.angle = Math.PI / 6;
    scene.add(spotLight); // 光源添加到scene
    // 设置用于计算阴影的光源对象
    spotLight.castShadow = true;
    // 设置计算阴影的区域，注意包裹对象周围
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 300;
    spotLight.shadow.camera.fov = 20;
    // 聚光光源辅助显示
    let spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    /**
     * 相机设置
     */
    let width = window.innerWidth; // 窗口宽高
    let height = window.innerHeight;
    let k = width / height; //宽高比
    let s = 150; // 三位场景中范围控制的系数，系数越大 显示范围越大。
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
    document.getElementById('shadow')?.appendChild(renderer.domElement);
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
      <div id="shadow" />
    </div>
  );
};

export default Shadow;
