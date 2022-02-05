tasks = JSON.parse(tasks);
var result = document.getElementById("tasks");

for (let val of tasks) {
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
            <!-- Bookmark button -->
            <button class="btn btn-sm bg-white p-0">
              <i id="mark-${val.id}" class="bi bi-bookmark" role="img" aria-label="Bookmark"></i>
            </button>
            <!-- Drag handle -->
              <button class="btn btn-sm bg-white p-0">
                <i class="bi bi-three-dots-vertical" role="img" aria-label="Drag handle"></i>
            </button>
          </div>
        </div>
        <!-- Task image -->
        <img src="img/${val.image}" class="img-fluid" alt="${val.taskName}" title="${val.imageCredit}">
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
            <button id="importance" class="btn btn-sm btn-success rounded-pill  py-0 mb-1">${val.importance}</button>
          </p>
          <!-- Deadline -->
          <p id="date-${val.id}" class="mb-0">
            <b>
              <i class="bi bi-calendar3" aria-hidden="true"></i>
              Deadline:
            </b> 
            <span class="small">${val.deadline}</span><br>
          </p>
        </div>
        <div class="card-footer bg-white  bg-white d-flex justify-content-end gap-2 pe-2">
          <!-- Delete button -->
          <button class="btn btn-sm btn-danger">
            <i class="bi bi-trash" aria-hidden="true"></i>
            Delete
          </button>
          <!-- Done button -->
          <button class="btn btn-sm btn-success">
            <i class="bi bi-check-circle" aria-hidden="true"></i>
            Done
          </button>
        </div>
      </div>
    </div>
    `
    
  var marked = document.getElementById(`mark-${val.id}`)
  var date = document.getElementById(`date-${val.id}`)

  console.log(date)

  if (val.marked == true) {
    marked.classList = "bi bi-bookmark-fill text-primary"
  } else {
    marked.classList = "bi bi-bookmark"
  }

  if (val.deadline == false) {
    date.style.visibility = "hidden"
  }
}

