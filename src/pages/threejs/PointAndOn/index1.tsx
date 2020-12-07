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
    let geometry = new THREE.BoxGeometry(100, 100, 100); // 立方体
    console.log(geometry);

    // 点材质
    // let material = new THREE.PointsMaterial({
    //   color: 0xff0000,
    //   size: 5
    // });
    // let points= new THREE.Points(geometry, material);
    // scene.add(points);

    // 线材质
    // let material = new THREE.LineBasicMaterial({
    //   color:0xff0000 //线条颜色
    // })
    // // 创建线对象
    // let line = new THREE.Line(geometry, material);
    // scene.add(line);

    // 网格模型
    let material = new THREE.MeshBasicMaterial({
      color: 0x0000ff, //三角面颜色
      // wireframe:true,//网格模型以线条的模式渲染
    });
    // 创建网格对象
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 网格模型xyz方向缩放 0.5,1.5,2 倍
    // mesh.scale.set(0.5,1.5,2);

    // 直接设置位置
    // mesh.position.set(100,100,100)

    // 向量表示
    var axis = new THREE.Vector3(1, 0, 0);
    axis.normalize(); // 向量归一化
    // // 沿着axis轴方向平移100
    // mesh.translateOnAxis(axis,100)

    // 旋转
    // mesh.rotateY(Math.PI / 4)
    // 绕 axis 轴旋转90度
    mesh.rotateOnAxis(axis, Math.PI / 4);
    console.log('aaa', mesh.rotation); //控制台查看：旋转方法，改变了rotation属性

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
