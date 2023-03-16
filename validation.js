import './style.scss'

const form = document.forms.newComment
form.noValidate = true

for (const field of form.elements) {
  if (field.name === 'date') continue

  field.addEventListener('invalid', function () {
    setFieldValidity(field)
  })

  field.addEventListener('input', function () {
    setFieldValidity(field)
  })
}

function setFieldValidity(field) {
  const validityState = field.validity

  if (!validityState.valid) {
    if (validityState.valueMissing) {
      field.setCustomValidity('Это поле не должно быть пустым!')
    }

    getErrorElement(field).textContent = field.validationMessage
    field.setCustomValidity('')
    field.setAttribute('aria-invalid', 'true')
  } else {
    getErrorElement(field).textContent = ''
    field.removeAttribute('aria-invalid')
  }
}

function getErrorElement(field) {
  const errorElementId = field.getAttribute('aria-describedby')
  return document.getElementById(errorElementId)
}
