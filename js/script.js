tasks = JSON.parse(tasks);
var result = document.getElementById("tasks");

tasks.forEach(function (val, i) {
  result.innerHTML += `
    <!-- Card -->
    <div class="col px-2">
      <div class="card">
        <div class="card-header bg-white d-flex row-cols-auto justify-content-between align-items-center p-0 py-2">
          <div class="col px-2">
            <!-- Task category -->
            <button class="btn btn-sm btn-info text-white">
              <i class="bi bi-list-task" aria-hidden="true"></i>
              ${val.category}</button>
          </div>
          <div class="col">
            <!-- Check button -->
            <button class="btn bg-white text-success p-0">
              <i id="check-${i}" class="bi bi-check-circle-fill" role="img" aria-label="Checked"></i>
            </button>
            <!-- Bookmark button -->
            <button class="btn bg-white p-0">
              <i id="mark-${i}" class="bi bi-bookmark text-muted" role="img" aria-label="Bookmark"></i>
            </button>
            <!-- Drag handle -->
            <button class="btn bg-white p-0">
              <i class="bi bi-three-dots-vertical" role="img" aria-label="Drag handle"></i>
            </button>
          </div>
        </div>
        <!-- Task image -->
        <img src="img/${val.image}" class="img-fluid border-bottom" alt="${val.taskName}" title="Image credit: ${val.imageCredit}">
        <div class="card-body">
          <!-- Task title -->
          <h5 class="card-title">${val.taskName}</h5>
          <!-- Task description -->
          <p class="card-text">
            <i>${val.description}</i><br>
          </p>
        </div>
        <div class="card-footer bg-white">
          <!-- Priority level -->
          <p class="mb-0">
            <b>
              <i class="bi bi-exclamation-triangle-fill" aria-hidden="true"></i>
              Priority level:
            </b>
            <!-- Importance button -->
            <button id="prio-${i}" class="prio btn btn-sm btn-success rounded-pill py-0 mb-1">${val.importance}</button>
          </p>
          <!-- Deadline -->
          <p id="date-${i}" class="mb-0">
            <b>
              <i class="bi bi-calendar3" aria-hidden="true"></i>
              Deadline:
            </b> 
            <span class="small">${val.deadline}</span><br>
          </p>
        </div>
        <div class="card-footer bg-white bg-white d-flex justify-content-end gap-2 px-0 row-cols-auto">
          <div class="col">
          <!-- Delete button -->
            <button class="btn btn-sm btn-danger">
              <i class="bi bi-trash" aria-hidden="true"></i>
              Delete
            </button>
            <!-- Done button -->
            <button id="done-${i}" class="btn btn-sm btn-success">
              <i class="bi bi-check-circle" aria-hidden="true"></i>
              Done
            </button>
        </div>
      </div>
    </div>
    `

  let marked = document.getElementById(`mark-${i}`)
  let done = document.getElementById(`done-${i}`)
  let check = document.getElementById(`check-${i}`)
  let date = document.getElementById(`date-${i}`)
  let prio = document.getElementById(`prio-${i}`)

  // Set Bookmark button
  if (val.marked == true) {
    marked.classList = "bi bi-bookmark-fill text-warning"
  } else {
    marked.classList = "bi bi-bookmark text-muted"
  }

  // Set Check button
  if (val.done == true) {
    check.style.visibility = "visible";
    done.disabled = true
  } else {
    check.style.visibility = "hidden";
    done.disabled = false
  }

  // Show/hide deadline
  if (val.deadline == false) {
    date.style.visibility = "hidden"
  } else {
    date.style.visibility = "visible"
  }

})

function increase() {
  let num = Number(this.innerText);
  console.log(this)

  if (num < 5) {
    this.innerText = num + 1
  }
  if (num < 1) {
    this.classList = "prio btn btn-sm btn-success rounded-pill py-0 mb-1"
  } else if (num < 3) {
    this.classList = "prio btn btn-sm btn-warning rounded-pill py-0 mb-1"
  } else {
    this.classList = "prio btn btn-sm btn-danger rounded-pill py-0 mb-1"
  }
}

// Add EventListener to importance button
var imp = document.getElementsByClassName("prio");

for (let i in imp) {
  imp[i].addEventListener("click", increase)
}