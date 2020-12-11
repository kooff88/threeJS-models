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
    var geometry = new THREE.BoxGeometry(40, 100, 40); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    // 设置产生投影的网格模型
    mesh.castShadow = true;
    // mesh.position.set(0,0,0)

    //创建一个平面几何体作为投影面
    var planeGeometry = new THREE.PlaneGeometry(300, 200);
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x999999,
    }); //材质对象Material

    // 平面网格模型作为投影面
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); //网格模型对象Mesh
    scene.add(planeMesh); //网格模型添加到场景中
    planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
    planeMesh.position.y = -50; //设置网格模型y坐标
    // 设置接收阴影的投影面
    planeMesh.receiveShadow = true;
    /**
     * 光源设置
     */
    //环境光   环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient); //环境光对象添加到scene场景中

    // 方向光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源位置
    directionalLight.position.set(60, 100, 40);
    scene.add(directionalLight);
    // 设置用于计算阴影的光源对象dd3
    directionalLight.castShadow = true;
    // 设置计算阴影的区域，最好刚好紧密包围在对象周围
    // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 300;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -100;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    // directionalLight.shadow.mapSize.set(1024,1024)
    console.log(directionalLight.shadow.camera);

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
