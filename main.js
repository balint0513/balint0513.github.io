// Check if textures are loading properly
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  'your-texture-path.jpg',  // Make sure this path is correct relative to your HTML file
  (texture) => {
    console.log('Texture loaded successfully');
    // Apply texture to your material
    material.map = texture;
    material.needsUpdate = true;
  },
  undefined,
  (error) => {
    console.error('Error loading texture:', error);
  }
);

// For background, if you're using a background texture:
scene.background = new THREE.Color(0xffffff); // Set a default color first
textureLoader.load(
  'your-background-texture.jpg',
  (texture) => {
    scene.background = texture;
    renderer.render(scene, camera);
  }
);

// Make sure renderer is properly set up
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// This is critical - make sure the canvas is added to the document
document.body.appendChild(renderer.domElement);

// Check for WebGL compatibility
if (!renderer.capabilities.isWebGL2) {
  console.warn('WebGL 2 not supported - falling back to WebGL 1');
  // You might want to show a warning to the user
}

// Add this at the beginning of your script
window.addEventListener('error', function(e) {
  console.error('Global error:', e.message);
});

// In your animation loop, add try/catch
function animate() {
  try {
    requestAnimationFrame(animate);
    // Your animation code
    renderer.render(scene, camera);
  } catch (error) {
    console.error('Animation error:', error);
  }
}