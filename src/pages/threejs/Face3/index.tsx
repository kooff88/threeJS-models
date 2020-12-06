import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import styles from './index.less';

console.log('THREE', THREE);
CameraControls.install({ THREE: THREE });
const Face3: FC<{}> = () => {
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
    let geometry = new THREE.Geometry();

    let p1 = new THREE.Vector3(0, 0, 0);
    let p2 = new THREE.Vector3(0, 100, 0);
    let p3 = new THREE.Vector3(50, 0, 0);
    let p4 = new THREE.Vector3(0, 0, 100);

    // 顶点坐标添加到geometry
    geometry.vertices.push(p1, p2, p3, p4);

    // Colors对象表示顶点颜色数据
    var color1 = new THREE.Color(0x00ff00); //顶点1颜色——绿色
    var color2 = new THREE.Color(0xff0000); //顶点2颜色——红色
    var color3 = new THREE.Color(0x0000ff); //顶点3颜色——蓝色
    var color4 = new THREE.Color(0xffff00); //顶点3颜色——黄色

    //顶点颜色数据添加到geomtry
    geometry.colors.push(color1, color2, color3, color4);

    // Face3构造函数创建以个三角面
    let face1 = new THREE.Face3(0, 1, 2);

    // 三角面每个顶点法向量
    let n1 = new THREE.Vector3(0, 0, -1); // 三角面face1顶点1的法向量
    let n2 = new THREE.Vector3(0, 0, -1); // 三角面face2顶点1的法向量
    let n3 = new THREE.Vector3(0, 0, -1); // 三角面face3顶点1的法向量

    // 设置三角面Face3三顶点的法向量
    face1.vertexNormals.push(n1, n2, n3);

    // 三角面2
    let face2 = new THREE.Face3(0, 2, 3);
    // 设置三角面face2法向量
    face2.normal = new THREE.Vector3(0, -1, 0);

    // 三角面face1,face2添加到几何体
    geometry.faces.push(face1, face2);

    //材质对象
    var material = new THREE.MeshLambertMaterial({
      // color: 0xffff00,
      vertexColors: THREE.VertexColors, //以顶点颜色为准
      // vertexColors: THREE.FaceColors,
      side: THREE.DoubleSide, //两面可见
    });
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

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
    document.getElementById('face3')?.appendChild(renderer.domElement);
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
      <div id="face3" />
    </div>
  );
};

export default Face3;
