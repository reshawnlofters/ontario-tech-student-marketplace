<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createItem } from '../services/itemsService'

const router = useRouter()

function getInitialFormState() {
  return {
    title: '',
    category: '',
    condition: '',
    price: '',
    stock: 1,
    image: '',
    sellerName: '',
    campusTag: '',
    description: '',
  }
}

const form = reactive(getInitialFormState())

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

function resetForm() {
  Object.assign(form, getInitialFormState())
  successMessage.value = ''
  errorMessage.value = ''
}

function validateForm() {
  if (
    !form.title ||
    !form.category ||
    !form.condition ||
    !form.price ||
    !form.image ||
    !form.sellerName ||
    !form.campusTag ||
    !form.description
  ) {
    return 'Please complete all fields before listing your item.'
  }

  if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
    return 'Price must be a positive number.'
  }

  if (!Number.isInteger(Number(form.stock)) || Number(form.stock) <= 0) {
    return 'Stock must be a whole number greater than 0.'
  }

  return ''
}

async function handleSubmit() {
  successMessage.value = ''
  errorMessage.value = ''

  const validationError = validateForm()

  if (validationError) {
    errorMessage.value = validationError
    return
  }

  isSubmitting.value = true

  try {
    await createItem({
      title: form.title.trim(),
      category: form.category,
      condition: form.condition,
      price: Number(form.price),
      image: form.image.trim(),
      description: form.description.trim(),
      sellerName: form.sellerName.trim(),
      campusTag: form.campusTag,
      stock: Number(form.stock),
    })

    successMessage.value = 'Your item was listed successfully.'

    Object.assign(form, getInitialFormState())

    setTimeout(() => {
      router.push('/')
    }, 900)
  } catch (error) {
    errorMessage.value = error.message || 'Failed to create item.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="section list-item-view">
    <div class="container">
      <div class="list-item-header mb-5">
        <p class="section-title">Marketplace Seller Form</p>
        <h1 class="page-title title is-2">List an Item</h1>
        <p class="list-item-subtitle">
          Add a new item to the marketplace by filling in the details below.
        </p>
      </div>

      <Transition name="fade">
        <div v-if="successMessage" class="notification is-success is-light">
          {{ successMessage }}
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="errorMessage" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>
      </Transition>

      <div class="box list-item-form-box">
        <form @submit.prevent="handleSubmit">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="field">
                <label class="label section-label">Item Title</label>
                <div class="control">
                  <input
                    v-model.trim="form.title"
                    class="input"
                    type="text"
                    placeholder="e.g. Graphing Calculator"
                    maxlength="100"
                  />
                </div>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Category</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="form.category">
                      <option disabled value="">Select a category</option>
                      <option>Books</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Accessories</option>
                      <option>Sports</option>
                      <option>Transportation</option>
                      <option>Merchandise</option>
                      <option>Car</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Condition</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="form.condition">
                      <option disabled value="">Select condition</option>
                      <option>New</option>
                      <option>Like New</option>
                      <option>Great Condition</option>
                      <option>Good Condition</option>
                      <option>Fair Condition</option>
                      <option>Used</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Price ($)</label>
                <div class="control">
                  <input
                    v-model.number="form.price"
                    class="input"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="e.g. 25"
                  />
                </div>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Stock</label>
                <div class="control">
                  <input
                    v-model.number="form.stock"
                    class="input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g. 1"
                  />
                </div>
              </div>
            </div>

            <div class="column is-12">
              <div class="field">
                <label class="label section-label">Image Path or URL</label>
                <div class="control">
                  <input
                    v-model.trim="form.image"
                    class="input"
                    type="text"
                    placeholder="./images/items/basketball.jpg"
                  />
                </div>
                <p class="help list-item-help">
                  Use a project image path or a direct image URL.
                </p>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Seller Name</label>
                <div class="control">
                  <input
                    v-model.trim="form.sellerName"
                    class="input"
                    type="text"
                    maxlength="60"
                    placeholder="e.g. Brian H."
                  />
                </div>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Campus Tag</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="form.campusTag">
                      <option disabled value="">Select campus</option>
                      <option>North Oshawa Campus</option>
                      <option>Downtown Oshawa Campus</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-12">
              <div class="field">
                <label class="label section-label">Description</label>
                <div class="control">
                  <textarea
                    v-model.trim="form.description"
                    class="textarea list-item-textarea"
                    maxlength="500"
                    placeholder="Describe the item, key details, and condition..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="list-item-actions">
            <button
              class="button reset-button"
              type="button"
              :disabled="isSubmitting"
              @click="resetForm"
            >
              Reset
            </button>

            <button
              class="button submit-button"
              type="submit"
              :class="{ 'is-loading': isSubmitting }"
              :disabled="isSubmitting"
            >
              List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>

.section-label,
.label.section-label {
  color: var(--otu-blue) !important;
  font-weight: 600;
}

.list-item-view {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.list-item-header {
  max-width: 760px;
}

.list-item-subtitle {
  max-width: 700px;
  color: rgb(74 74 74);
  line-height: 1.6;
}

.list-item-form-box {
  padding: 2rem;
  background-color: white;
  border: 1px solid rgb(0 60 113 / 10%);
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgb(4 42 75 / 8%);
}

.label {
  margin-bottom: 0.5rem;
}

.input,
.select select,
.list-item-textarea {
  color: #222;
  background-color: white;
  border: 1px solid var(--otu-input-border);
  box-shadow: none;
}

.input:focus,
.select select:focus,
.list-item-textarea:focus {
  border-color: var(--otu-light-blue);
  box-shadow: 0 0 0 0.125em rgb(0 119 202 / 12%);
}

.list-item-textarea {
  min-height: 140px;
  padding-top: 0.875rem;
  resize: vertical;
}

.list-item-help {
  margin-top: 0.35rem;
  color: rgb(107 114 128);
}

.list-item-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.9rem;
  margin-top: 1.5rem;
}

.reset-button {
  color: var(--otu-blue);
  background-color: white;
  border: 1px solid var(--otu-blue);
}

.submit-button {
  color: white;
  background-color: var(--otu-light-blue);
  border: 1px solid var(--otu-light-blue);
}

@media screen and (width <= 768px) {
  .list-item-form-box {
    padding: 1.25rem;
  }

  .list-item-actions {
    flex-direction: column;
  }

  .list-item-actions .button {
    width: 100%;
  }
}
</style>