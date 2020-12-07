import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const PointAndOn: FC<{}> = () => {
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
    let geometry = new THREE.BoxGeometry(20, 20, 20); // 立方体
    console.log(geometry);

    // 网格模型
    let material = new THREE.MeshLambertMaterial({
      color: 0x0000ff, //三角面颜色
      // wireframe:true,//网格模型以线条的模式渲染
    });
    // 创建网格对象, 批量建造
    // for(let i = 0; i< 10; i++) {
    //   // 创建网格对象
    //   let mesh = new THREE.Mesh(geometry, material);
    //   mesh.translateY( i * 25 );
    //   scene.add(mesh);
    // }

    // 克隆
    let mesh = new THREE.Mesh(geometry, material);
    for (let i = 0; i < 10; i++) {
      // 执行clone 方法克隆mesh, 注意不能 var newMesh = mesh
      var newMesh = mesh.clone();
      newMesh.translateY(i * 25);
      scene.add(newMesh);
    }

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
    document.getElementById('pointAndOn')?.appendChild(renderer.domElement);
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
      <div id="pointAndOn" />
    </div>
  );
};

export default PointAndOn;
