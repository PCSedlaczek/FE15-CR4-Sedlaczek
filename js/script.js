// Get tasks from JSON file
tasks = JSON.parse(tasks);

let result = document.getElementById("tasks");

// Create task cards
function createCards() {
  result.innerHTML = "";

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
              <i id="check${i}" class="bi bi-check-circle-fill" role="img" aria-label="Checked"></i>
            </button>
            <!-- Bookmark button -->
            <button class="btn bg-white p-0">
              <i id="mark${i}" class="bi" role="img" aria-label="Bookmark"></i>
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
            <button id="prio${i}" class="prio btn btn-sm btn-success rounded-pill py-0 mb-1">${val.importance}</button>
          </p>
          <!-- Deadline -->
          <p id="date${i}" class="mb-0">
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
            <button id="done${i}" class="btn btn-sm btn-success">
              <i class="bi bi-check-circle" aria-hidden="true"></i>
              Done
            </button>
        </div>
      </div>
    </div>
    `

    // Get priority from localStorage
    let prio = document.getElementsByClassName("prio")
    let saved = localStorage.getItem(`prio${i}`);

    if (saved) {
      prio[i].innerText = saved;
      tasks[i].importance = saved;
    }

    // Set button color according to priority level
    btncolor(i)

    // Add EventListener to importance button
    for (let i = 0; i < prio.length; i++) {
      prio[i].addEventListener("click", function(){
        increase(i);
      });
    }

    // Set Bookmark button
    let mark = document.getElementById(`mark${i}`)

    if (val.mark == true) {
      mark.classList.add("bi-bookmark-fill", "text-warning")
    } else {
      mark.classList.add("bi-bookmark", "text-muted")
      mark.classList.remove("bi-bookmark-fill", "text-warning")
    }

    // Set Checkmark icon & disable Done button
    let check = document.getElementById(`check${i}`)
    let done = document.getElementById(`done${i}`)

    if (val.done == true) {
      check.style.visibility = "visible";
      done.disabled = true
    } else {
      check.style.visibility = "hidden";
      done.disabled = false
    }

    // Hide deadline if not set
    let date = document.getElementById(`date${i}`)

    if (val.deadline == false) {
      date.style.visibility = "hidden"
    } else {
      date.style.visibility = "visible"
    }
  })
}

// Increase Priority level
function increase(i) {
  let saved = localStorage.getItem(`prio${i}`);
  let num = tasks[i].importance

    if (saved) {
      num = saved;
    }
  
  let id = document.getElementsByClassName("prio")[i].id;

  // Increase priority up to 5
  if (num < 5) {
    num++;
    tasks[i].importance++;
    document.getElementsByClassName("prio")[i].innerText = num;
    localStorage.setItem(id, num)
  }
  btncolor(i)
}

function btncolor(i) {
  let prio = document.getElementsByClassName("prio")
  let imp = tasks[i].importance

  // Change importance color according to priority
  if (imp < 2) {
    prio[i].classList.add("btn-success")
  } else if (imp < 4) {
    prio[i].classList.add("btn-warning")
    prio[i].classList.remove("btn-success")
  } else {
    prio[i].classList.remove("btn-success", "btn-warning")
    prio[i].classList.add("btn-danger")
  }
}

// Sort by priority
function prioSort() {

  // Sort descending
  tasks.sort(function(a, b) {
    return b.importance - a.importance
  })

  // console.table(tasks)
  createCards();
}

// Call createCards function
createCards();

// Add EventListener to sort button
let sort = document.getElementById("sort")
sort.addEventListener("click", function() {
  prioSort();
})
