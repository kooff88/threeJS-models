import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const MaterialAll: FC<{}> = () => {
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
    // let geometry = new THREE.SphereGeometry(100, 25,25); // 创建一个球体几何对象
    // let geometry = new THREE.PlaneBufferGeometry(100,100); // 创建一个立方体
    let geometry = new THREE.BoxGeometry(100, 100, 100); // 立方体
    console.log(geometry);

    //基础网格材质对象   不受光照影响  没有棱角感
    // var material = new THREE.MeshBasicMaterial({
    //   color: 0x0000ff,
    // })
    //
    // 与光照计算满反射，产生棱角感，粗糙不光亮暗淡的材质表面
    // let material = new THREE.MeshLambertMaterial({
    //   color: 0x00ff00
    // })

    // // 网格模型对象
    // let mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    // 线材质
    let material = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      // wireframe:true, //将几何天渲染成线框
      // transparent:true, // 开启透明
      // opacity:0.5, // 透明度
      //前面 FrontSide ,后面 BackSide, 双面 DoubleSide
      side: THREE.DoubleSide,
      // side: THREE.FrontSide
      // side: THREE.BackSide
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
    document.getElementById('materialAll')?.appendChild(renderer.domElement);
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
      <div id="materialAll" />
    </div>
  );
};

export default MaterialAll;
