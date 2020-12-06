import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const PointPosition: FC<{}> = () => {
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
    let geometry = new THREE.BufferGeometry();
    // 类型数组创建顶点数据
    let vertices = new Float32Array([0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10]);

    // 创建属性缓冲对象, 3个为一组，表示顶点的xyz
    let attribute = new THREE.BufferAttribute(vertices, 3);

    // 设置几何体 attributes属性的位置属性
    geometry.attributes.position = attribute;

    // // 三角面（网格）模式渲染
    // let material = new THREE.MeshBasicMaterial({
    //   color:0x0000ff,
    //   side: THREE.DoubleSide
    // })

    // // 网格模型对象
    // let mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    // 点模型
    // let material = new THREE.PointsMaterial({
    //   color: 0xff0000,
    //   size: 10.0 // 点对象像素尺寸
    // })

    // let points = new THREE.Points(geometry, material);
    // scene.add(points);

    // 线模型
    let material = new THREE.LineBasicMaterial({
      color: 0xff0000,
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
    document.getElementById('pointPosition')?.appendChild(renderer.domElement);
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
      <div id="pointPosition" />
    </div>
  );
};

export default PointPosition;
