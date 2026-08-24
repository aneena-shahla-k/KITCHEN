import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Filter,
  Search,
  X,
} from "lucide-react";

import "../styles/KitchensPage.css";

import lShape from "../images/projects/l-shaped.jpg";
import uShape from "../images/projects/u-shaped.jpg";
import parallel from "../images/projects/parallel.jpg";
import island from "../images/projects/island.jpg";
import modern from "../images/modernn.jpg";
import minimal from "../images/minimal.jpg";
import luxury from "../images/luxury.jpg";
import classic from "../images/classic.jpg";
import wood from "../images/wood.jpg";


const kitchens = [
  {
    id: "modern-l-shaped",
    name: "Modern L-Shaped",
    layout: "L-Shaped",
    style: "Modern",
    finish: "Acrylic",
    space: "Medium",
    image: lShape,
  },
  {
    id: "warm-l-shaped",
    name: "Warm Wood L-Shaped",
    layout: "L-Shaped",
    style: "Warm",
    finish: "Veneer",
    space: "Medium",
    image: wood,
  },
  {
    id: "minimal-l-shaped",
    name: "Minimal L-Shaped",
    layout: "L-Shaped",
    style: "Minimal",
    finish: "Laminate",
    space: "Compact",
    image: minimal,
  },
  {
    id: "contemporary-u-shaped",
    name: "Contemporary U-Shaped",
    layout: "U-Shaped",
    style: "Contemporary",
    finish: "PU Finish",
    space: "Large",
    image: uShape,
  },
  {
    id: "classic-u-shaped",
    name: "Classic U-Shaped",
    layout: "U-Shaped",
    style: "Classic",
    finish: "Laminate",
    space: "Large",
    image: classic,
  },
  {
    id: "modern-parallel",
    name: "Modern Parallel",
    layout: "Parallel",
    style: "Modern",
    finish: "Acrylic",
    space: "Compact",
    image: parallel,
  },
  {
    id: "minimal-parallel",
    name: "Minimal Parallel",
    layout: "Parallel",
    style: "Minimal",
    finish: "Laminate",
    space: "Medium",
    image: minimal,
  },
  {
    id: "luxury-island",
    name: "Luxury Island",
    layout: "Island",
    style: "Luxury",
    finish: "PU Finish",
    space: "Large",
    image: island,
  },
  {
    id: "modern-island",
    name: "Modern Island",
    layout: "Island",
    style: "Modern",
    finish: "Acrylic",
    space: "Large",
    image: modern,
  },
  {
    id: "classic-island",
    name: "Classic Island",
    layout: "Island",
    style: "Classic",
    finish: "Veneer",
    space: "Large",
    image: classic,
  },
  {
    id: "luxury-modern",
    name: "Luxury Contemporary",
    layout: "L-Shaped",
    style: "Luxury",
    finish: "PU Finish",
    space: "Medium",
    image: luxury,
  },
  {
    id: "modern-straight",
    name: "Modern Straight",
    layout: "Straight",
    style: "Modern",
    finish: "Acrylic",
    space: "Compact",
    image: modern,
  },
];


const layoutOptions = [
  "L-Shaped",
  "U-Shaped",
  "Parallel",
  "Island",
  "Straight",
];

const styleOptions = [
  "Modern",
  "Minimal",
  "Contemporary",
  "Classic",
  "Luxury",
  "Warm",
];

const finishOptions = [
  "Acrylic",
  "Laminate",
  "Veneer",
  "PU Finish",
];

const spaceOptions = [
  "Compact",
  "Medium",
  "Large",
];


const KitchensPage = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const layoutFromUrl = searchParams.get("layout");

  const [selectedLayout, setSelectedLayout] = useState(
    layoutFromUrl || "All"
  );

  const [selectedStyle, setSelectedStyle] = useState("All");

  const [selectedFinish, setSelectedFinish] = useState("All");

  const [selectedSpace, setSelectedSpace] = useState("All");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("recommended");

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);


  const changeLayout = (layout) => {
    setSelectedLayout(layout);

    if (layout === "All") {
      searchParams.delete("layout");
    } else {
      searchParams.set(
        "layout",
        layout.toLowerCase().replace(" ", "-")
      );
    }

    setSearchParams(searchParams);
  };


  const clearFilters = () => {
    setSelectedLayout("All");
    setSelectedStyle("All");
    setSelectedFinish("All");
    setSelectedSpace("All");
    setSearch("");

    searchParams.delete("layout");
    setSearchParams(searchParams);
  };


  const filteredKitchens = useMemo(() => {
    let result = kitchens.filter((kitchen) => {

      const matchesLayout =
        selectedLayout === "All" ||
        kitchen.layout === selectedLayout;

      const matchesStyle =
        selectedStyle === "All" ||
        kitchen.style === selectedStyle;

      const matchesFinish =
        selectedFinish === "All" ||
        kitchen.finish === selectedFinish;

      const matchesSpace =
        selectedSpace === "All" ||
        kitchen.space === selectedSpace;

      const matchesSearch =
        kitchen.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        kitchen.layout
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        kitchen.style
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesLayout &&
        matchesStyle &&
        matchesFinish &&
        matchesSpace &&
        matchesSearch
      );
    });


    if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "layout") {
      result = [...result].sort((a, b) =>
        a.layout.localeCompare(b.layout)
      );
    }

    return result;
  }, [
    selectedLayout,
    selectedStyle,
    selectedFinish,
    selectedSpace,
    search,
    sort,
  ]);


  return (
    <main className="kitchens-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="kitchens-hero">

        <div className="kitchens-hero-inner">

          <span className="kitchens-eyebrow">
            KITCHEN COLLECTION
          </span>

          <h1>
            Find a kitchen
            <br />
            <span>that fits your home.</span>
          </h1>

          <p>
            Explore layouts, styles and finishes designed
            around the way you live.
          </p>

        </div>

      </section>


      {/* =================================================
          CATEGORY NAVIGATION
      ================================================= */}

      <section className="kitchens-browser">

        <div className="kitchen-layout-tabs">

          <button
            type="button"
            className={
              selectedLayout === "All"
                ? "active"
                : ""
            }
            onClick={() => changeLayout("All")}
          >
            All kitchens
          </button>

          {layoutOptions.map((layout) => (
            <button
              key={layout}
              type="button"
              className={
                selectedLayout === layout
                  ? "active"
                  : ""
              }
              onClick={() => changeLayout(layout)}
            >
              {layout}
            </button>
          ))}

        </div>


        {/* =================================================
            MOBILE FILTER BUTTON
        ================================================= */}

        <button
          type="button"
          className="mobile-filter-button"
          onClick={() =>
            setMobileFiltersOpen(true)
          }
        >
          <Filter size={16} />
          Filter & Sort
        </button>


        {/* =================================================
            MAIN BROWSER
        ================================================= */}

        <div className="kitchens-browser-layout">

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}

          <aside className="kitchens-sidebar">

            <div className="sidebar-heading">
              <strong>Filter kitchens</strong>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>


            {/* STYLE */}

            <FilterGroup
              title="Style"
              options={styleOptions}
              value={selectedStyle}
              setValue={setSelectedStyle}
            />


            {/* FINISH */}

            <FilterGroup
              title="Finish"
              options={finishOptions}
              value={selectedFinish}
              setValue={setSelectedFinish}
            />


            {/* SPACE */}

            <FilterGroup
              title="Space"
              options={spaceOptions}
              value={selectedSpace}
              setValue={setSelectedSpace}
            />

          </aside>


          {/* =================================================
              RESULTS
          ================================================= */}

          <section className="kitchens-results">

            <div className="results-toolbar">

              <div>
                <strong>
                  {filteredKitchens.length}
                </strong>

                <span>
                  kitchens
                </span>
              </div>


              <div className="results-actions">

                {/* SEARCH */}

                <div className="kitchen-search">

                  <Search size={15} />

                  <input
                    type="text"
                    placeholder="Search kitchens"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                    >
                      <X size={13} />
                    </button>
                  )}

                </div>


                {/* SORT */}

                <div className="sort-select">

                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                  >
                    <option value="recommended">
                      Recommended
                    </option>

                    <option value="name">
                      Name
                    </option>

                    <option value="layout">
                      Layout
                    </option>
                  </select>

                  <ChevronDown size={14} />

                </div>

              </div>

            </div>


            {/* =================================================
                ACTIVE FILTERS
            ================================================= */}

            {(selectedLayout !== "All" ||
              selectedStyle !== "All" ||
              selectedFinish !== "All" ||
              selectedSpace !== "All") && (

              <div className="active-filters">

                {selectedLayout !== "All" && (
                  <FilterTag
                    label={selectedLayout}
                    onRemove={() =>
                      changeLayout("All")
                    }
                  />
                )}

                {selectedStyle !== "All" && (
                  <FilterTag
                    label={selectedStyle}
                    onRemove={() =>
                      setSelectedStyle("All")
                    }
                  />
                )}

                {selectedFinish !== "All" && (
                  <FilterTag
                    label={selectedFinish}
                    onRemove={() =>
                      setSelectedFinish("All")
                    }
                  />
                )}

                {selectedSpace !== "All" && (
                  <FilterTag
                    label={selectedSpace}
                    onRemove={() =>
                      setSelectedSpace("All")
                    }
                  />
                )}

              </div>
            )}


            {/* =================================================
                CARDS
            ================================================= */}

            {filteredKitchens.length > 0 ? (

              <div className="kitchens-grid">

                {filteredKitchens.map((kitchen) => (

                  <button
                    key={kitchen.id}
                    type="button"
                    className="kitchen-card"
                    onClick={() =>
                      navigate(
                        `/kitchens/${kitchen.id}`
                      )
                    }
                  >

                    <div className="kitchen-card-image">

                      <img
                        src={kitchen.image}
                        alt={kitchen.name}
                      />

                      <div className="kitchen-card-overlay" />

                      <span className="kitchen-card-arrow">
                        <ArrowUpRight size={17} />
                      </span>

                    </div>


                    <div className="kitchen-card-info">

                      <div>

                        <span className="kitchen-card-layout">
                          {kitchen.layout}
                        </span>

                        <h2>
                          {kitchen.name}
                        </h2>

                      </div>

                      <div className="kitchen-card-meta">

                        <span>
                          {kitchen.style}
                        </span>

                        <span>
                          {kitchen.finish}
                        </span>

                      </div>

                    </div>

                  </button>

                ))}

              </div>

            ) : (

              <div className="no-kitchens">

                <h3>
                  No kitchens found
                </h3>

                <p>
                  Try changing your filters or
                  searching for something else.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Reset filters
                </button>

              </div>

            )}

          </section>

        </div>

      </section>


      {/* =================================================
          MOBILE FILTER DRAWER
      ================================================= */}

      {mobileFiltersOpen && (

        <div className="mobile-filter-backdrop">

          <div className="mobile-filter-panel">

            <div className="mobile-filter-header">

              <strong>
                Filter & Sort
              </strong>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="mobile-filter-content">

              <FilterGroup
                title="Style"
                options={styleOptions}
                value={selectedStyle}
                setValue={setSelectedStyle}
              />

              <FilterGroup
                title="Finish"
                options={finishOptions}
                value={selectedFinish}
                setValue={setSelectedFinish}
              />

              <FilterGroup
                title="Space"
                options={spaceOptions}
                value={selectedSpace}
                setValue={setSelectedSpace}
              />


              <div className="mobile-sort">

                <span>
                  Sort by
                </span>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="name">
                    Name
                  </option>

                  <option value="layout">
                    Layout
                  </option>
                </select>

              </div>

            </div>


            <div className="mobile-filter-footer">

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear all
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              >
                Show {filteredKitchens.length} kitchens
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
};


/* =====================================================
   FILTER GROUP
===================================================== */

const FilterGroup = ({
  title,
  options,
  value,
  setValue,
}) => {

  return (
    <div className="filter-group">

      <h3>
        {title}
      </h3>

      <div className="filter-options">

        <button
          type="button"
          className={
            value === "All"
              ? "selected"
              : ""
          }
          onClick={() => setValue("All")}
        >
          <span className="filter-radio" />
          All
        </button>

        {options.map((option) => (

          <button
            key={option}
            type="button"
            className={
              value === option
                ? "selected"
                : ""
            }
            onClick={() =>
              setValue(option)
            }
          >
            <span className="filter-radio" />
            {option}
          </button>

        ))}

      </div>

    </div>
  );
};


/* =====================================================
   FILTER TAG
===================================================== */

const FilterTag = ({
  label,
  onRemove,
}) => {

  return (
    <button
      type="button"
      className="filter-tag"
      onClick={onRemove}
    >
      {label}
      <X size={12} />
    </button>
  );
};


export default KitchensPage;