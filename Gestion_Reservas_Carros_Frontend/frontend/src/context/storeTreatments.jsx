import { create } from "zustand"
import axios from "axios";
import { toast } from "react-toastify";


const storeTreatments = create(set=>({
    modal:false,
    toggleModal: (modalType) => set((state) => ({ modal: state.modal === modalType ? null : modalType })),

    
    registerTreatments:async(data)=>{
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const url = `${import.meta.env.VITE_BACKEND_URL}/`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
            }
            const respuesta = await axios.post(url, data,options)
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
    },
    deleteTreatments:async(id)=>{
        const isConfirmed  = confirm("Vas a eliminar el producto ¿Estás seguro de realizar esta acción?")
        if (isConfirmed ) {
            try {
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const url = `${import.meta.env.VITE_BACKEND_URL}/:id/${id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedUser.state.token}`,
                    }
                }
                const respuesta = await axios.delete(url,options)
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.error(error)
            }
        }
    },
    payTreatments:async(data)=>{
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const url = `${import.meta.env.VITE_BACKEND_URL}/producto/pago`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
            }
            const respuesta = await axios.post(url,data,options)
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
        
    }
}))


export default storeTreatments
