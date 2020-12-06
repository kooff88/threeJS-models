import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

CameraControls.install({ THREE: THREE });

const MoreGeo: FC<{}> = () => {
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
    // let geometry = new THREE.BoxGeometry(200, 200, 200);
    //let geometry = new THREE.SphereGeometry(60,40,40) // 球体几何体
    //圆柱体: 顶部，底部直径50,50  高100 圆周分段数
    // let geometry = new THREE.CylinderGeometry(50,50,100,25);
    // 正八面体
    // var geometry = new THREE.OctahedronGeometry(50);
    // 正十二面体
    // var geometry = new THREE.DodecahedronGeometry(50);
    // 正二十面体
    var geometry = new THREE.IcosahedronGeometry(50);

    let material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
    }); // 材质material

    // 创建网格模型对象mesh
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh); // 网格模型添加到场景中

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
    document.getElementById('moreGeo')?.appendChild(renderer.domElement);
    const cameraControls = new CameraControls(camera, renderer.domElement);
    renderer.render(scene, camera);

    // 渲染函数
    const clock = new THREE.Clock();
    function render() {
      // snip
      const delta = clock.getDelta();
      const hasControlsUpdated = cameraControls.update(delta);
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
      <div id="moreGeo" />
    </div>
  );
};

export default MoreGeo;
