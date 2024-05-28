import {atom} from 'recoil'

const firstNameAtom=atom({
    key:"firstNameAtom",
    default:""
})
const lastNameAtom=atom({
    key:"lastNameAtom",
    default:""
})
const emailAtom=atom({
    key:"emailAtom",
    default:""
})
const passwordAtom=atom({
    key:"passwordAtom",
    default:""
})

const tokenAtom=atom({
    key:"token",
    default:""
})

export{
    firstNameAtom,
    lastNameAtom,
    emailAtom,
    passwordAtom,
    tokenAtom
}