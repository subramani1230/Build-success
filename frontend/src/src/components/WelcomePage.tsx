import React from "react";

interface Document {
  title: string;
  description: string;
  link: string;
}

interface WelcomePageProps {
  /** Application context path (e.g. "/myapp") */
  contextPath: string;
  /** Logged‑in user name – undefined/null when not authenticated */
  userName?: string;
  /** CSRF parameter name (e.g. "_csrf") – required for logout */
  csrfParameterName?: string;
  /** CSRF token value – required for logout */
  csrfToken?: string;
  /** List of documents supplied by the server */
  docsList: Document[];
}

/**
 * Modern React implementation of `welcome.jsp`.
 * Preserves the original UI hierarchy, conditional rendering,
 * logout behaviour and document table while applying the
 * modern CSS design system (`.modern-*` classes).
 */
const WelcomePage: React.FC<WelcomePageProps> = ({
  contextPath,
  userName,
  csrfParameterName,
  csrfToken,
  docsList,
}) => {
  /** Submit a hidden POST form to the Spring Security logout endpoint */
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Build a form programmatically to keep the exact POST + CSRF contract
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${contextPath}/logout`;

    if (csrfParameterName && csrfToken) {
      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = csrfParameterName;
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="modern-container">
      {/* Header / Navbar */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="/">
            App Name
          </a>

          {userName && (
            <>
              {/* Hidden logout form – kept for parity with original JSP */}
              <form
                id="logoutForm"
                method="POST"
                action={`${contextPath}/logout`}
                style={{ display: "none" }}
              >
                {csrfParameterName && csrfToken && (
                  <input
                    type="hidden"
                    name={csrfParameterName}
                    value={csrfToken}
                  />
                )}
              </form>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <a
                      style={{ color: "#FFFFFF" }}
                      href="#"
                      className="nav-link"
                    >
                      {userName}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <div className="modern-card" style={{ marginTop: "80px", padding: "20px" }}>
        {userName && (
          <>
            <div className="row col-md-9 col-md-offset-2 custyle">
              <h3>Document List</h3>
            </div>

            <div className="row col-md-6 col-md-offset-2 custyle">
              {docsList && docsList.length > 0 ? (
                <div className="modern-table-wrapper">
                  <table className="table table-striped custab modern-table">
                    <thead className="modern-table-header">
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docsList.map((doc, idx) => (
                        <tr key={idx} className="modern-table-row">
                          <td>{doc.title}</td>
                          <td>{doc.description}</td>
                          <td className="text-center">
                            <a
                              className="btn btn-info btn-xs"
                              href={doc.link}
                              download
                            >
                              <span className="glyphicon glyphicon-download" />
                              {" "}Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h5>No document to display</h5>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;