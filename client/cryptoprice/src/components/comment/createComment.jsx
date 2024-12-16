import { useState } from "react";

const CreateComment = () => {
  const [hidden,setHidden]=useState("hidden");
  const [formData, setFormData] = useState({
    author: "",
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleFormFields()) {
      console.log("alanlar dolu");
      const result = await fetch(process.env.REACT_APP_COMMENTS_URL, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          author: formData.author,
          comment: formData.comment,
        }),
      })
        .then((res) => res.json())
       
      console.log(result);
    }
    else {
      console.log("alanlar boş")

    }

   
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFormFields = () => {
    if (formData.comment === "" || formData.author === "") {
      alert("Please Fill username and comment area");
      return false;
    }
    else return true;
  };

  return (
    <>
  
  <div className="ml-20 underline lg:text-base md:text-base sm:text-base xs:text-xs font-mono">
<a onClick={()=>setHidden("")} >Write Your Comment </a>
  </div>
      <div class={hidden}>
  
        <div class="ml-20  lg:max-w-screen-sm px-4 rounded-xl ">
        
          <div class="-ml-20 flex p-4 text-left text-gray-700">
            <img
              class="mr-5 h-8 w-8 rounded-full"
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt=""
            />
            <div class="w-full space-y-3 text-gray-700 font-mono xs:text-xs ">
              <form onSubmit={handleSubmit}>
                <div class="">
                  <input
                    type="text"
                    placeholder="name"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    class="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                  />
                </div>
                {/* <div class="">
          <input type="text" placeholder="Email" class="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring" />
        </div> */}
                <div class="">
                  <textarea
                    name="comment"
                    id="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Write your comment here"
                    cols="30"
                    rows="4"
                    class="h-30 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"
                  ></textarea>
                </div>
                <div class="float-right">
                  <input
                    type="submit"
                    value="Post"
                    class="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring lg:text-base md:text-base sm:text-base xs:text-xs font-mono"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateComment;
