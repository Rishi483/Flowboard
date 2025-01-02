import { Container,Stack,TextField,Button,Typography } from "@mui/material"
import LogoImg from "../../assets/logo.svg"
import ImageEl from "../../components/utils/ImageEl"
import { useState } from "react"
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import useStore from "../../store"
const initForm={
  email:'',
  password:''
}

const AuthScreen = () => {
  const [loading,setLoading]=useState(false);
  const [isLogin,setIsLogin]=useState(true);
  const authText=isLogin?"Do not have an account?":"Already have an account?";
  const [form,setForm]=useState(initForm);
  const handleChange=e=>setForm(oldForm=>({...oldForm,[e.target.name]:e.target.value}))
  const {setToastr}=useStore();

  const handleAuth=async()=>{
    try {
      setLoading(true);
      if(isLogin){
        await signInWithEmailAndPassword(auth,form.email,form.password);
      }
      else{
        await createUserWithEmailAndPassword(auth,form.email,form.password);
      }
    } 
    catch (err) {
      const msg=err.code.split('auth/')[1].split('-').join(' ');
      setToastr(msg);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs"
     sx={{
      mt:10,
    }}>
      <Stack mb={6} spacing={4} alignItems={'center'} textAlign={'center'}>
        <ImageEl src={LogoImg} alt="FlowBoard" />
        <Typography color="rgba(255,255,255,0.6)">
        Visualize Your Workflow for Increased Productivity.
          <br/>
        Access Your Tasks Anytime , Anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
          <TextField value={form.email} name="email" onChange={handleChange} label="Email"/>
          <TextField type="password" value={form.password} name="password" onChange={handleChange} label="Password"/>
          <Button disabled={loading || form.email==='' || form.password===''} onClick={handleAuth} size="large" variant="contained">
            {isLogin?"Login":"Register"}
          </Button>
      </Stack>
      <Typography sx={{cursor:"pointer"}} onClick={()=>setIsLogin(o=>!o)} textAlign={'center'} mt={3}>
        {authText} 
      </Typography> 
    </Container>
  )
}

export default AuthScreen
