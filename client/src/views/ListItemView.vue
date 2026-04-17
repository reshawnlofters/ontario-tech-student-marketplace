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

  if (form.title.length > 50) {
    return 'Item title cannot exceed 50 characters.'
  }

  if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
    return 'Price must be a positive number.'
  }

  if (!Number.isInteger(Number(form.stock)) || Number(form.stock) <= 0) {
    return 'Stock must be a whole number greater than 0.'
  }

  if (form.description.length > 125) {
    return 'Item description cannot exceed 125 characters.'
  }

  return ''
}

async function handleFormSubmission() {
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

    successMessage.value = 'Your item was listed.'

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
      <div class="list-item-hero box">
        <div>
          <p class="list-item-hero-eyebrow">List an Item</p>
          <h1 class="page-title title is-2">Seller Form</h1>
          <p class="list-item-hero-subtitle">
            List a new item on the marketplace by filling out the details below.
          </p>
        </div>
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

      <div class="list-item-form-container box">
        <form @submit.prevent="handleFormSubmission">
          <div class="columns is-multiline">
            <div class="column is-12">
              <div class="field">
                <label class="label section-label">Item Title</label>
                <div class="control">
                  <input
                    v-model.trim="form.title"
                    class="input"
                    type="text"
                    placeholder="E.g., Graphing Calculator"
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
                      <option>Great Condition</option>
                      <option>Good Condition</option>
                      <option>Fair Condition</option>
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
                    placeholder="E.g., 25"
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
                    placeholder="E.g., 1"
                  />
                </div>
              </div>
            </div>

            <div class="column is-12">
              <div class="field">
                <label class="label section-label">Image URL</label>
                <div class="control">
                  <input
                    v-model.trim="form.image"
                    class="input"
                    type="text"
                    placeholder="https://example.com/item.jpg"
                  />
                </div>
                <p class="help list-item-help">
                  Use a direct image URL ending in .jpg, .png, or .webp
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
                    placeholder="E.g., Brian H."
                  />
                </div>
              </div>
            </div>

            <div class="column is-12-tablet is-6-desktop">
              <div class="field">
                <label class="label section-label">Campus Pickup Location</label>
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
                    class="textarea list-item-form-textarea"
                    maxlength="500"
                    placeholder="Describe the item..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="list-item-buttons-container">
            <button
              class="reset-form-button button"
              type="button"
              :disabled="isSubmitting"
              @click="resetForm"
            >
              Reset Form
            </button>

            <button
              class="submit-form-button button"
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
.list-item-hero {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  min-height: 12.5rem;
  padding: 2rem;
  margin-bottom: 3rem;
  background:
    linear-gradient(135deg, rgb(4 42 75 / 98%), rgb(0 60 113 / 92%)),
    linear-gradient(135deg, rgb(231 93 42 / 28%), transparent 55%);
  border-radius: 0.75rem;
  box-shadow: 0 24px 48px rgb(4 42 75 / 16%);
}

.list-item-hero-eyebrow {
  margin: 0;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  color: rgb(255 255 255 / 72%);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.list-item-hero-subtitle {
  max-width: 48rem;
  line-height: 1.7;
  color: rgb(255 255 255 / 86%);
}

.list-item-hero .page-title {
  color: white !important;
}

.list-item-form-container {
  padding: 2rem;
  background-color: var(--otu-light-grey);
  border-radius: 0.75rem;
}

.section-label {
  margin-bottom: 0.5rem;
  color: var(--otu-blue) !important;
}

input,
select,
.list-item-form-textarea {
  color: black;
  background-color: white;
  border: 1px solid var(--otu-input-border);
}

::placeholder {
  color: gray;
}

.list-item-form-textarea {
  min-height: 140px;
  padding-top: 0.875rem;
  resize: vertical;
}

.list-item-help {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: rgb(107 114 128);
}

.list-item-buttons-container {
  display: flex;
  gap: 0.9rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.reset-form-button,
.submit-form-button {
  padding: 0.75rem 1.125rem;
}

.reset-form-button {
  color: var(--otu-blue);
  background-color: white;
  border: 1px solid var(--otu-blue);
}

.submit-form-button {
  color: white;
  background-color: var(--otu-light-blue);
  border: 1px solid var(--otu-light-blue);
}

@media screen and (width <= 768px) {
  .list-item-form-container {
    padding: 1.25rem;
  }

  .list-item-buttons-container {
    flex-direction: column;
  }

  .list-item-buttons-container .button {
    width: 100%;
  }
}
</style>
