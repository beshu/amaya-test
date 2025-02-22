<template>
  <h2 class="title">Manage Product Reviews</h2>
  <div class="select-box">
    <label for="review-selector">Select Review:</label>
    <select v-model="selectedReviewId" id="review-selector">
      <option
        v-for="review in sliderStore.reviews"
        :key="review.id"
        :value="review.id"
      >
        {{ review.signature }} (Score: {{ review.score }})
      </option>
    </select>
  </div>

  <div v-if="selectedReview" class="review-card">
    <h3>Edit Review</h3>
    <div class="form-group">
      <label for="score">Score:</label>
      <input type="number" v-model="selectedReview.score" min="1" max="5" />
    </div>
    <div class="form-group">
      <label for="text">Review Text:</label>

      <textarea v-model="selectedReview.text" rows="4"></textarea>
    </div>
    <div class="form-group">
      <label for="signature">Signature:</label>
      <input type="text" v-model="selectedReview.signature" />
    </div>

    <div class="button-group">
      <button class="btn primary" @click="saveReview">Save Review</button>
      <button class="btn danger" @click="deleteReview">Delete Review</button>
    </div>
  </div>

  <div class="review-card new-review">
    <h3>Create New Review</h3>
    <div class="form-group">
      <label for="new-text">Review Text:</label>
      <textarea v-model="newReview.text" rows="4"></textarea>
    </div>

    <div class="form-group">
      <select v-model="newReview.productAppId" id="product-app-selector">
        <option
          v-for="productApp in productApps"
          :key="productApp.id"
          :value="productApp.id"
        >
          {{ productApp.name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="new-score">Score:</label>
      <input type="number" v-model="newReview.score" min="1" max="5" />
    </div>
    <div class="form-group">
      <label for="new-signature">Signature:</label>
      <input type="text" v-model="newReview.signature" />
    </div>

    <button class="btn success" @click="createReview">Create Review</button>
  </div>
</template>

<script setup lang="ts">
import { socket } from "@/composables/socket";
import { useSliderStore } from "~/stores/slider";
import type { SerializeObject } from "nitropack/types";
import type { Prisma } from "@prisma/client";
const sliderStore = useSliderStore();

const selectedReviewId = ref(null);
const selectedReview = ref(null);
const newReview = ref({
  text: "",
  score: 3,
  signature: "Anonymous",
  productAppId: 1,
});
const productApps: Ref<SerializeObject<Prisma.ProductAppGetPayload<{}>>[]> =
  ref([]);

const { refresh } = await useAsyncData(
  "fetchReviews",
  sliderStore.fetchReviews,
);
await useAsyncData("fetchProducts", async () => {
  const result = await $fetch("/api/product", {
    method: "get",
  });
  productApps.value = result;
});
watch(selectedReviewId, () => {
  updateSelectedReview();
});

function updateSelectedReview() {
  selectedReview.value =
    sliderStore.reviews.find(
      (review) => review.id === selectedReviewId.value,
    ) || null;
}

async function saveReview() {
  if (!selectedReview.value) return;

  await $fetch(`/api/review/${selectedReview.value.id}`, {
    method: "PUT",
    body: {
      score: selectedReview.value.score,
      text: selectedReview.value.text,
      signature: selectedReview.value.signature,
    },
  });
  await refresh();
  socket.emit("reviews:flush");
}

async function deleteReview() {
  if (!selectedReview.value) return;

  await $fetch(`/api/review/${selectedReview.value.id}`, { method: "DELETE" });
  await refresh();
  socket.emit("reviews:flush");
}

// Create a new review
async function createReview() {
  if (!newReview.value.text || !newReview.value.signature) return;

  const newReviewData = {
    text: newReview.value.text,
    score: newReview.value.score,
    signature: newReview.value.signature,
    productAppId: newReview.value.productAppId,
  };

  await $fetch("/api/review", {
    method: "POST",
    body: newReviewData,
  });

  await refresh();
  socket.emit("reviews:flush");
}
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.select-box {
  margin-bottom: 15px;
}

.review-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.review-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn.primary {
  background: #007bff;
  color: white;
}

.btn.primary:hover {
  background: #0056b3;
}

.btn.danger {
  background: #dc3545;
  color: white;
}

.btn.danger:hover {
  background: #a71d2a;
}

.btn.success {
  background: #28a745;
  color: white;
}

.btn.success:hover {
  background: #1c7d31;
}

.new-review {
  margin-top: 30px;
  background: #eef6ff;
}
</style>
