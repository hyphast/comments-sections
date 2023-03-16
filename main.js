import './style.scss'
import { getRelativeTime } from './utils'

const form = document.forms.newComment
const commentsList = document.getElementById('commentsList')
const textarea = form.querySelector('textarea')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  if (!form.checkValidity()) return

  addNewComment(form)
})

commentsList.addEventListener('click', function (event) {
  const target = event.target

  if (target.dataset.delete != undefined) {
    const commentElement = target.closest('.comment-item')
    commentElement.remove()
  } else if (target.dataset.like != undefined) {
    target.classList.toggle('like')
  }
})

// submit textarea on Enter
textarea.addEventListener('keydown', function (event) {
  const keyCode = event.which || event.keyCode

  // 13 represents the Enter key
  if (keyCode === 13 && !event.shiftKey) {
    if (!form.checkValidity()) return

    addNewComment(form)

    event.preventDefault()
  }
})

function addNewComment(form) {
  const commentsListRoot = document.getElementById('commentsList')

  const newComment = createNewComment(form)

  commentsListRoot.append(newComment)
}

function createNewComment(form) {
  const commentElement = document.getElementById('commentItem')

  const userNameValue = form.elements.userName.value
  const newDateValue = form.elements.date.value
  const newMessageValue = form.elements.message.value

  const newCommentElement = commentElement.cloneNode(true)
  const userNameElement = newCommentElement.querySelector(
    '.comment-item__user-name'
  )
  const timeElement = newCommentElement.querySelector('.comment-item__time')
  const messageElement = newCommentElement.querySelector(
    '.comment-item__message'
  )

  userNameElement.textContent = userNameValue
  timeElement.textContent = getRelativeTime(newDateValue)
  messageElement.textContent = newMessageValue
  newCommentElement.hidden = false

  // clearing inputs
  form.elements.userName.value = ''
  form.elements.date.value = ''
  form.elements.message.value = ''

  return newCommentElement
}
