import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: radial-gradient(1200px 600px at 20% 10%, #eef2ff 0%, rgba(238, 242, 255, 0) 55%),
    radial-gradient(900px 500px at 80% 20%, #e0f2fe 0%, rgba(224, 242, 254, 0) 55%),
    #f8f9fc;
`;
export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;
export const LeftImage = styled.div`
  flex: 1;
  background: url("/img/login-side.png") center / cover no-repeat;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(2, 6, 23, 0.35) 0%, rgba(2, 6, 23, 0) 55%);
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
export const Right = styled.div`
  padding: 40px 36px;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

export const DaonText = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: rgba(15, 23, 42, 0.5);
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;

  a {
    color: #2563eb;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .sep {
    color: rgba(15, 23, 42, 0.4);
  }
`;
export const Title = styled.h1`
  font-size: 1.35rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

export const SubTitle = styled.p`
  margin: 0 0 28px 0;
  text-align: center;
  font-size: 0.95rem;
  color: rgba(15, 23, 42, 0.65);
`;
export const Form = styled.form`
  width: 100%;
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.95rem 1.05rem;
  margin-bottom: 12px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  color: #0f172a;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &::placeholder {
    color: rgba(15, 23, 42, 0.45);
  }

  &:hover {
    background: #fff;
  }

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.9);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
    background: #fff;
  }
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  margin: 8px 0 16px 0;
  color: rgba(15, 23, 42, 0.75);

  input {
    transform: translateY(0.5px);
  }
`;
export const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 45%, #7c3aed 100%);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.08s ease, filter 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);

  &:hover {
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.15);
    opacity: 0.75;
    box-shadow: none;
  }
`;
export const Divider = styled.hr`
  margin: 18px 0;
  border: none;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
`;
export const SocialButton = styled.button<{variant:"google"|"facebook"|"instagram";}>`
margin-top:0.8rem;
width:100%; padding:0.7rem 1.2rem; 
border-radius:10rem; border:none; cursor:pointer;
display:flex; align-items:center;
justify-content:center;
gap:0.6rem; font-size:0.9rem; font-weight:600;
background:${({variant}) => {
    switch(variant){
        case "google":
            return "#ffffff";
        case "facebook":
            return "#1877f2";
        case "instagram":
            return "linear-gradient(45deg, #f58529, #dd2a7b, #8134af)";
        default:
            return "#ccc";
    }
}};
color:${({variant}) => variant === "google"?"#444":"#fff"};
border:${({variant}) => variant === "google" ? "1px solid #ddd" :"none" };

box-shadow:0 2px 6px rgba(0,0,0,0.15);
transition: all 0.2s ease;
i{font-size:1rem;}
&:hover{
transform:translateY(-1px);
opacity:0.95;
}
`;
/*export const SocialButton = styled.button<{bg:string}>`
width:100%; padding:0.65rem; border-radius:10rem; border:none;
color:#fff; font-size:0.85rem; margin-bottom:0.5rem;
background:${({bg}) => bg};
cursor:pointer;
`;*/
export const LinkText = styled.a`
  display: block;
  text-align: center;
  font-size: 0.9rem;
  color: #2563eb;
  margin-top: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;