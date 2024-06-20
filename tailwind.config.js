/* @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      colors:{
        main_color:" #efefef",
        primary_color: "#1d2d3d",
        secondary_color:"#495e74" ,
        gray_color: "#778697",
        dark_color: "#292b2c",
        blue_color: "#0275d8",
        green_color: "#27ae60",
        green_sea_color: "#16a085",
        pumpkin_color:"#d35400",
        red_color: "#d9534f",
        white_color: "#fff"
      },
      keyframes:{
        change:{
          "0%":{
            backgroundColor:"white"
          },
          "100%":{
            backgroundColor:"#e9e9e9"

          }
        }
      }
      ,
      Animation:{
            change:"change 5s ease-in-out infinite"
      }
    },
  },
  plugins: [],
}