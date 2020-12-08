import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const Light: FC<{}> = () => {
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
    var geometry1 = new THREE.BoxGeometry(100, 100, 100);
    var material1 = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    }); //材质对象Material
    var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    scene.add(mesh1); //网格模型添加到场景中
    mesh1.translateX(-150); //沿着x轴平移150
    var mesh2 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    scene.add(mesh2); //网格模型添加到场景中
    mesh2.translateX(150); //沿着x轴平移150

    // 辅助坐标系 AxisHelper
    let axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**
     * 光源设置
     */
    //聚光灯
    let spotLight = new THREE.SpotLight(0xffffff);
    // 设置聚光灯光源位置
    spotLight.position.set(200, 200, 200);
    // 聚光灯指向网格模式mesh2
    // spotLight.target = mesh2;
    // 设置聚光灯发散角度
    spotLight.angle = Math.PI / 6;
    // scene.add(spotLight);

    // // 直接设置target
    // spotLight.target.position.set(-100, 0,0)
    // scene.add(spotLight.target);

    // 创建一个用来设置target的Object3d
    let targetObj = new THREE.Object3D();
    targetObj.translateX(150);
    scene.add(targetObj);
    spotLight.target = targetObj;

    scene.add(spotLight);

    // 方向灯
    // let directionLight = new THREE.DirectionalLight(0xffffff,1);
    //  // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    // // 注意：位置属性在这里不代表方向光的位置，你可以认为方向光没有位置
    // directionLight.position.set(80,100,50);
    // // 方向光指向对象mesh2,可不设置，默认0,0,0
    // directionLight.target = mesh2;
    // scene.add(directionLight)

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
    document.getElementById('light')?.appendChild(renderer.domElement);
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
      <div id="light" />
    </div>
  );
};

export default Light;
