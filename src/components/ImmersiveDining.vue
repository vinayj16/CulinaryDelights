<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Signature dishes data
const signatureDishes = ref([
  {
    id: 1,
    name: 'Wagyu Steak',
    description: 'Premium A5 Wagyu beef with truffle-infused mashed potatoes, seasonal vegetables, and red wine reduction',
    price: 42,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    modelUrl: 'https://models.readyplayer.me/64f8c9d5c4fad3e8c2c2f3a1.glb',
    tags: ['signature', 'meat', 'hot'],
    ingredients: ['A5 Wagyu Beef', 'Truffle', 'Seasonal Vegetables', 'Red Wine Reduction'],
    nutritionalInfo: { calories: 850, protein: '45g', carbs: '35g', fat: '60g' },
    allergens: ['Dairy']
  },
  // Add other dishes similarly
]);

// Current dish index
const currentDishIndex = ref(0);

// Rotation values for 3D model
const rotationX = ref(0);
const rotationY = ref(0);

// Zoom level
const zoomLevel = ref(1);

// Is dragging
const isDragging = ref(false);

// Mouse position
const mouseStartX = ref(0);
const mouseStartY = ref(0);

// Animation timeline
let timeline = null;

// Auto-rotation interval
let autoRotateInterval = null;

// Get current dish
const currentDish = ref(signatureDishes.value[currentDishIndex.value]);

// Navigate to next dish
const nextDish = () => {
  gsap.to('.dish-details', {
    opacity: 0,
    y: 20,
    duration: 0.3,
    onComplete: () => {
      currentDishIndex.value = (currentDishIndex.value + 1) % signatureDishes.value.length;
      currentDish.value = signatureDishes.value[currentDishIndex.value];
      gsap.to('.dish-details', { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
      // Reset rotation and zoom
      rotationX.value = 0;
      rotationY.value = 0;
      zoomLevel.value = 1;
    }
  });
};

// Navigate to previous dish
const prevDish = () => {
  gsap.to('.dish-details', {
    opacity: 0,
    y: 20,
    duration: 0.3,
    onComplete: () => {
      currentDishIndex.value = (currentDishIndex.value - 1 + signatureDishes.value.length) % signatureDishes.value.length;
      currentDish.value = signatureDishes.value[currentDishIndex.value];
      gsap.to('.dish-details', { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
      // Reset rotation and zoom
      rotationX.value = 0;
      rotationY.value = 0;
      zoomLevel.value = 1;
    }
  });
};

// Handle mouse down for rotation
const handleMouseDown = (e) => {
  isDragging.value = true;
  mouseStartX.value = e.clientX;
  mouseStartY.value = e.clientY;
  // Stop auto-rotation when user interacts
  clearInterval(autoRotateInterval);
};

// Handle mouse move for rotation
const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  const deltaX = e.clientX - mouseStartX.value;
  const deltaY = e.clientY - mouseStartY.value;
  rotationX.value += deltaY * 0.1;
  rotationY.value += deltaX * 0.1;
  mouseStartX.value = e.clientX;
  mouseStartY.value = e.clientY;
};

// Handle mouse up to stop rotation
const handleMouseUp = () => {
  isDragging.value = false;
};

// Handle zoom
const handleZoom = (direction) => {
  if (direction === 'in') {
    zoomLevel.value = Math.min(zoomLevel.value + 0.1, 2);
  } else {
    zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5);
  }
};

// Model style
const modelStyle = () => ({
  transform: `rotateX(${rotationX.value}deg) rotateY(${rotationY.value}deg) scale(${zoomLevel.value})`
});

// Add event listeners
onMounted(() => {
  const modelContainer = document.querySelector('.model-container');
  if (modelContainer) {
    modelContainer.addEventListener('mousedown', handleMouseDown);
    modelContainer.addEventListener('mousemove', handleMouseMove);
    modelContainer.addEventListener('mouseup', handleMouseUp);
    modelContainer.addEventListener('mouseleave', handleMouseUp);
  }
  window.addEventListener('wheel', handleWheel);
});

// Clean up event listeners
onBeforeUnmount(() => {
  clearInterval(autoRotateInterval);
  const modelContainer = document.querySelector('.model-container');
  if (modelContainer) {
    modelContainer.removeEventListener('mousedown', handleMouseDown);
    modelContainer.removeEventListener('mousemove', handleMouseMove);
    modelContainer.removeEventListener('mouseup', handleMouseUp);
    modelContainer.removeEventListener('mouseleave', handleMouseUp);
  }
  window.removeEventListener('wheel', handleWheel);
  if (timeline) {
    timeline.kill();
  }
});
</script>
