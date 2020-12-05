import React, { FC, useEffect } from 'react';
import * as THREE from 'three';
import styles from './index.less';

console.log('THREE', THREE);
const Rotate: FC<{}> = () => {
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
    //let geometry = new THREE.SphereGeometry(60,40,40) // 球体几何体
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    }); // 材质material

    // 创建网格模型对象mesh
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh); // 网格模型添加到场景中

    /**
     * 光源设置
     */
    // 点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(100, 800, 100); // 点光源位置
    scene.add(point); // 点光源添加到场景中
    // 环境光
    let ambient = new THREE.AmbientLight(0x444444);
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
    camera.position.set(200, 200, 200); // 相机位置
    camera.lookAt(scene.position); // 设置相机方向，指向场景对象

    /**
     * 创建渲染器对象
     */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); // 蛇追渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色

    // 元素中插入canvas对象
    document.getElementById('rotate')?.appendChild(renderer.domElement);

    // function render(){
    //   // 执行渲染操作,指定场景，相机作为参数
    //   renderer.render(scene, camera);
    //   mesh.rotateY(0.01); // 每次绕y轴旋转0.01弧度
    //   requestAnimationFrame(render);
    // }

    // 渲染函数
    let T0 = new Date(); // 上次时间
    let n = 0;
    function render() {
      // 进行循环计算， 占用cpu资源，延迟计算
      // 进行循环计算，占用CPU计算资源，延迟时间
      // for (var i = 0; i < 10000; i++) {
      //   for (var j = 0; j < 1000; j++) {
      //     n+=1
      //   }
      // }

      let T1 = new Date(); //本次时间
      let t = T1 - T0; // 时间差
      T0 = T1; // 把本次时间给上次
      renderer.render(scene, camera);
      mesh.rotateY(0.01); // 每次绕y轴旋转0.01弧度
      requestAnimationFrame(render);
    }

    render();

    // setInterval(() =>render(), 20)
  };

  return (
    <div className={styles.container}>
      <div id="rotate" />
    </div>
  );
};

export default Rotate;
