import { useState } from "react";
import { useCreateCabin } from "../../features/cabins/useCreateCabin";
import "./createCabin.css";

export default function CreateCabinForm() {
  const [name, setName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [regularPrice, setRegularPrice] = useState("");

  const { mutate, isPending } = useCreateCabin();

  function handleSubmit(e) {
    e.preventDefault();

    mutate({
      name,
      maxcapacity: Number(maxCapacity),
      regularprice: Number(regularPrice),
      discount: 0,
      image: "https://picsum.photos/200",
    });

    setName("");
    setMaxCapacity("");
    setRegularPrice("");
  }

  return (
    <form className="cabin-form" onSubmit={handleSubmit}>
      <h2 className="form-title">➕ Add New Cabin</h2>

      <div className="form-grid">
        <input
          className="input"
          placeholder="Cabin name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Max capacity"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
        />

        <input
          className="input"
          placeholder="Regular price"
          value={regularPrice}
          onChange={(e) => setRegularPrice(e.target.value)}
        />
      </div>

      <button className="btn" disabled={isPending}>
        {isPending ? "Adding..." : "Add Cabin"}
      </button>
    </form>
  );
}
