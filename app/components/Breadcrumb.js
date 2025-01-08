import React from "react";

const Breadcrumb = ({ breadcrumb, handleBreadcrumbClick }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {breadcrumb.length > 0 && (
        <nav>
          <span
            style={{
              cursor: "pointer",
              color: "#007BFF",
              textDecoration: "underline",
            }}
            onClick={() => handleBreadcrumbClick("")}
          >
            Home
          </span>
          {breadcrumb.map((crumb, index) => (
            <span key={index}>
              {" > "}
              <span
                style={{
                  cursor: "pointer",
                  color: "#007BFF",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  handleBreadcrumbClick(
                    breadcrumb.slice(0, index + 1).join("/")
                  )
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
