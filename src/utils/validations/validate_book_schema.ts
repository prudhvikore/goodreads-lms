import joi from "joi"


function validate_user(){
    const schema=joi.object({
      username:joi.string().required().lowercase(),
      password:joi.string().required()
    })
    return schema;
  }
  
  const data = validate_user().validate({username:
  "annana"})

  export {validate_user}
   