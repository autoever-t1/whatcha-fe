import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email === 'cryptodaeho@gmail.com' && formData.password === 'password') {
      sessionStorage.setItem('at', 'dummy-token');
      navigate('/');
    } else {
      alert('로그인 정보가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          <span className='text-3xl font-extrabold text-blue-900'>WHAT</span>
          <span className='text-3xl font-extrabold text-gray-900'>CHA</span>
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 mb-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none rounded-t-md focus:outline-none"
                placeholder="이메일 주소"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none "
                placeholder="비밀번호"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md group hover:bg-gray-700 focus:outline-none"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


// import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import * as THREE from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { TextureLoader } from 'three';

// const Login = () => {
//   const navigate = useNavigate();
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   useEffect(() => {
//     if (!mountRef.current) return;
  
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000000);
  
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);
  
//     // 주변광 추가
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
//     scene.add(ambientLight);
  
//     // 스포트라이트 추가
//     const spotLight = new THREE.SpotLight(0x00ff00, 2); // 녹색 조명
//     spotLight.position.set(10, 10, 10);
//     spotLight.angle = Math.PI / 6;
//     spotLight.penumbra = 0.1;
//     spotLight.decay = 1;
//     spotLight.distance = 100;
//     scene.add(spotLight);
  
//     // 포인트 라이트 추가
//     const pointLight1 = new THREE.PointLight(0xff0000, 1); // 빨간색 조명
//     pointLight1.position.set(-5, 5, 5);
//     scene.add(pointLight1);
  
//     const pointLight2 = new THREE.PointLight(0x0000ff, 1); // 파란색 조명
//     pointLight2.position.set(5, -5, 5);
//     scene.add(pointLight2);
  
//      // 텍스처 로더 생성
//   const textureLoader = new TextureLoader();
  
//   // 텍스처 로드 (이미지 경로는 public 폴더 기준)
//   const carTexture = textureLoader.load('/car-texture.jpg');
  
//   // 재질 생성
//   const material = new THREE.MeshStandardMaterial({
//     map: carTexture,
//     metalness: 0.5,
//     roughness: 0.5
//   });

//   // OBJ 모델 로드
//   const loader = new OBJLoader();
//   loader.load('/base.obj', (object) => {
//     object.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.material = material;
//       }
//     });
//     object.scale.set(0.5, 0.5, 0.5);
//     scene.add(object);
//   });
//     camera.position.z = 5;

//     // 애니메이션
//     let time = 0;
//     const animate = () => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (car) {
//         // 랜덤 회전
//         car.rotation.y = time;
//         // 원형 움직임
//         car.position.x = Math.sin(time) * 2;
//         car.position.y = Math.cos(time) * 2;
//       }

//       // 조명 움직임
//       spotLight.position.x = Math.sin(time * 0.7) * 15;
//       spotLight.position.y = Math.cos(time * 0.5) * 15;

//       renderer.render(scene, camera);
//     };

//     animate();

//     // 클린업
//     return () => {
//       mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, []);

//   // 폼 핸들러
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.email === 'cryptodaeho@gmail.com' && formData.password === 'password') {
//       sessionStorage.setItem('at', 'dummy-token');
//       navigate('/');
//     }
//   };

//   return (
//     <div className="relative min-h-screen">
//       {/* Three.js 캔버스 */}
//       <div ref={mountRef} className="absolute inset-0" />
      
//       {/* 로그인 폼 */}
//       <div className="relative z-10 flex items-center justify-center min-h-screen">
//         <div className="w-full max-w-md p-8 space-y-8 rounded-lg bg-black/50 backdrop-blur-lg">
//           <h2 className="text-3xl font-bold text-center text-white">로그인</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* 폼 내용 */}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;