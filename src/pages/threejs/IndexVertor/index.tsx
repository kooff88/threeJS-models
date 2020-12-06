import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const IndexVerter: FC<{}> = () => {
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
    let vertices = new Float32Array([
      0,
      0,
      0, //顶点1坐标
      80,
      0,
      0, //顶点2坐标
      80,
      80,
      0, //顶点3坐标
      0,
      80,
      0, //顶点4坐标
    ]);

    // 创建缓冲区对象
    let attribute = new THREE.BufferAttribute(vertices, 3);
    geometry.attributes.position = attribute;

    let normals = new Float32Array([
      0,
      0,
      1, //顶点1法向量
      0,
      0,
      1, //顶点2法向量
      0,
      0,
      1, //顶点3法向量
      0,
      0,
      1, //顶点4法向量
    ]);

    // 设置attribues顶点属性 color颜色
    geometry.attributes.color = new THREE.BufferAttribute(normals, 3);

    // Uint16Array类型数组创建顶点索引数据
    let indexes = new Uint16Array([0, 1, 2, 0, 2, 3]);

    // 索引数据给给几何体的index属性
    geometry.index = new THREE.BufferAttribute(indexes, 1); // 1个为一组

    //材质
    let material = new THREE.MeshBasicMaterial({
      color: 0x0000ff, //三角面颜色
      side: THREE.DoubleSide, //两面可见
    });

    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 辅助坐标系 AxisHelper
    let axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

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
    document.getElementById('indexVerter')?.appendChild(renderer.domElement);
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
      <div id="indexVerter" />
    </div>
  );
};

export default IndexVerter;
