const BASE_URL = "http://localhost:3000/masai"

let student_container = document.getElementById("container")

display_students()


function create_student(name, score, batch, section, id) {
    console.log(id)
    return `
            <div class="student">
                <h3>${name}</h3>
                <p class="student_score">${score}</p>
                <p>Batch: ${batch}</p>
                <p>${section}</p>
                <button class="remove_student" onclick=delete_student("${id}")>reomve student</button>
                <button class="update_score" onclick=update_score("${id}")>update score</button>
            </div>
        `
}

async function getStudents(sort=false, filter=false) {

    if (sort && filter) {
        let res = await fetch(`${BASE_URL}?_sort=score&_order=${sort}&${filter}=5`)
        let students = await res.json()
        return students
    } else if (sort) {
        let res = await fetch(`${BASE_URL}?_sort=score&_order=${sort}`)
        let students = await res.json()
        return students
    } else if (filter) {
        let res = await fetch(`${BASE_URL}?${filter}=5`)
        let students = await res.json()
        return students
    } else {
        let res = await fetch(BASE_URL)
        let students = await res.json()
        return students
    }
    
    // console.log(students)
    
}

// getStudents()

async function display_students(sort, filter) {
    
    student_container.innerHTML= ""

    let student_list = await getStudents(sort, filter)

    // console.log(student_list)

    let students_list_display = student_list.map((item)=> {
        return create_student(item.name, item.score, item.batch, item.section, item.id)
    })


    student_container.innerHTML = students_list_display.join("")


    // const delete_btn = document.querySelectorAll(".remove_student")

    // let delete_btns = Array.from(delete_btn)

    // delete_btns.forEach(item => {
    //     item.addEventListener("click", async (item) => {
    //         delete_student(item.id)
    //     })
    // })

    // console.log(delete_btns)

}


let st_name = document.getElementById("name")
let st_batch = document.getElementById("batch")
let st_section = document.getElementById("section")
let st_score = document.getElementById("eval_score")
let st_image = document.getElementById("image")
let st_form = document.getElementById("form")
let st_btn = document.getElementById("add_student")

let newStudent = {
    name: "",
    score: 0,
    section: "",
    batch: "",
    image: ""
}

st_name.addEventListener("change", (e) => {
    newStudent.name = e.target.value
})

st_batch.addEventListener("change", (e) => {
    newStudent.batch = e.target.value
})

st_section.addEventListener("change", (e) => {
    newStudent.section = e.target.value
})

st_score.addEventListener("change", (e) => {
    newStudent.score = +e.target.value
})

st_image.addEventListener("change", (e) => {
    newStudent.image = e.target.value
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log(newStudent)

    let res = await fetch(BASE_URL, {
        method: "POST",
        headers: { 
            'Content-Type':  
                'application/json'
        }, 
        body: JSON.stringify(newStudent)
    })

    display_students()
})


// sortion on base of score



const high_to_low_btn = document.getElementById("sort-high-to-low")
const low_to_high_btn = document.getElementById("sort-low-to-high")

high_to_low_btn.addEventListener("click", () => {
    display_students("desc")
})

low_to_high_btn.addEventListener("click", () => {
    display_students("asc")
})


// filtering 

// id="greater-than">Score > = 5</button>
//           <button id="less-than"></button>


const greaterthan_bnt = document.getElementById("greater-than")
const lessthan_btn = document.getElementById("less-than")

greaterthan_bnt.addEventListener("click", () => {
    display_students(false, "score_gte")
})

lessthan_btn.addEventListener("click", () => {
    display_students(false, "score_lte")
})



// delete student 

async function delete_student(id) {
    console.log(id)
    let res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
}



// update score 

const new_score_input = document.getElementById("new_score")

let newScore = ""

new_score_input.addEventListener("change", (e) => {
    newScore = e.target.value
})

// async function update_score(id) {
//     new_score_input.disabled = false

    

//     let res = await fetch(`${BASE_URL}/${id}`, {
//         method: "PATCH",
//         headers: { 
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({score: newScore})
//     })
// }



display_students()