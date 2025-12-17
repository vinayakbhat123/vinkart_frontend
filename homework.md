## step by step to create vite frontend project
  # Install Vite 
    - npm create vite@latest
    - link -> https://vite.dev/guide/
  # Install tailwindcss 
    - npm install tailwindcss @tailwindcss/vite
    - link ->https://tailwindcss.com/docs/installation/using-vite
  # Install shadcnUI 
    - link -> https://ui.shadcn.com/docs/installation/vite
    - Install button ->    npx shadcn@latest add button
    - Install card   ->    npx shadcn@latest add card
    - Install label  =>     npx shadcn@latest add label
    - Install input  =>     npx shadcn@latest add input
    - Install sonner =>    npx shadcn@latest add sonner(toast)
    - Install Tabs   =>   npx shadcn@latest add tabs
    - Install select =>  npx shadcn@latest add select 
    - Insatll skeleton => npx shadcn@latest add skeleton 
    - Install separator => npx shadcn@latest add separator
    - Insatll breadcrumb =>npx shadcn@latest add breadcrumb 
    - Install textarea => npx shadcn@latest add  textarea
    - install dialog  => npx shadcn@latest add dialog
    - Install alert -dialog =>  npx shadcn@latest add alert-dialog
  # Install  react router dom
    - npm i react-router-dom
    - created paths for routing
    - created Home,signup and login pages and installed shdycnUI components
    - created Sign up page
  # Install axios
    - npm i axios
    - fetch the /auth/signup api
  # Install cors in backend
    - use { withCredentials :true } while calling api
  # Used  { Eye, EyeOff,Loader2 } from "lucide-react";
    
  - Created Signup API using cors
  - Created Login API and Loader feature to this
  -  created navbar and Hero section
  # Install react-icons/fa
    - npm i react-icons --save
   - created footer page
  # Install react reduxjs/toolkit
     - npm install @reduxjs/toolkit
     - npm install react-redux
        - create a store
        - create a userSlice
        - provider to main.jsx
    - created profile page
  # Creating Products page
       - created Products page for get products
       - created productcard page and call a api /getallproducts 
       - created filtersidebar 
   - created productsSlice
      - setproducts  action
      - setcart action
   - products added to cart
  - created a /cart page 
     -  post   /addtocart API
     -  put   /updatecart 
     - delete /removecartitems
  - creating Admin dashboard
     - created Dashboard page
     - created adminsales page 
  # Install react-medium-image-zoom
     - npm i react-medium-image-zoom
  # created admin pages 
    - created admin addproducts 
    - created admin updateproducts