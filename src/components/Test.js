
import * as THREE from 'three';
import { OrbitControls } from '../assets/js/orbitcontrols';
import React, { useEffect, useRef, useState }from 'react';
import Footer from './footer/footer.component';

const Test = () => {
    let canvas = useRef();

    useEffect(()=>{
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        canvas.current.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
        scene.add( gridHelper );
        scene.add( cube );

        camera.position.z = 25;
        const controls = new OrbitControls( camera, renderer.domElement );

        let rate = 0;
        const animate = function () {
            requestAnimationFrame( animate );
            rate = rate + 0.001;
            cube.position.x =  0 + 3 * Math.sin(rate);
            cube.position.z =  0 + 3 * Math.cos(rate);
            cube.position.y =  0 + 3 * Math.cos(rate);
            controls.update();
            renderer.render( scene, camera );
        };

        animate();
    },[])

    return (
        <>
            <div ref={canvas}>
                {/* do not put any tags in here */}
            </div>
            <Footer/>
        </>
    )
}
export default Test;