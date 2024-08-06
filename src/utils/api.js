import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "en", gl: "US"},
    headers: {
        "X-RapidAPI-Key":
            "f215c8eef0msh238c47ee0569227p1d1253jsna95327d531b2",
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};