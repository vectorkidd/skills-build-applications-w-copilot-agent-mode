import React, { useEffect, useMemo, useState } from 'react';

const baseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';
const endpoint = `${baseUrl}/activities/`;

function Activities() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    console.log('[Activities] Fetching data from', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((payload) => {
        const payloadData = Array.isArray(payload) ? payload : payload?.results ?? payload;
        console.log('[Activities] Received data', payload);
        setData(payloadData);
      })
      .catch((fetchError) => {
        console.error('[Activities] Error fetching data', fetchError);
        setError(fetchError.message);
      });
  }, [refreshIndex]);

  const displayedData = useMemo(() => {
    if (!Array.isArray(data)) return data;
    if (!filter.trim()) return data;
    const query = filter.toLowerCase();
    return data.filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  }, [data, filter]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
        <div>
          <h2 className="h5 mb-1">Activities</h2>
          <p className="mb-0 text-muted small text-break">Endpoint: {endpoint}</p>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setRefreshIndex((index) => index + 1)}>
            Refresh
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowRaw(true)}>
            View Raw
          </button>
        </div>
      </div>

      <div className="card-body">
        <form className="row g-2 align-items-center mb-3">
          <div className="col-md-8">
            <label htmlFor="activitiesFilter" className="form-label visually-hidden">
              Filter activities
            </label>
            <input
              id="activitiesFilter"
              className="form-control form-control-sm"
              type="search"
              placeholder="Filter activities"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
          <div className="col-auto">
            <span className="badge bg-info text-dark">{Array.isArray(data) ? `${data.length} items` : data ? 'Loaded' : 'Pending'}</span>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}
        {!data && !error && <div className="text-center text-muted">Loading activities...</div>}

        {Array.isArray(displayedData) && displayedData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover table-bordered table-sm align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item) => (
                  <tr key={item.id ?? item.pk ?? item.name ?? Math.random()}>
                    <td>{item.id ?? item.pk ?? '-'}</td>
                    <td>{item.name ?? item.title ?? 'N/A'}</td>
                    <td>{item.description ?? item.summary ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {Array.isArray(displayedData) && displayedData.length === 0 && !error && (
          <div className="alert alert-warning mb-0">No activities match your filter criteria.</div>
        )}

        {data && !Array.isArray(data) && (
          <div className="alert alert-secondary mb-0">
            <pre className="mb-0 small">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      {showRaw && (
        <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activities API Response</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowRaw(false)} />
              </div>
              <div className="modal-body">
                <pre className="small">{JSON.stringify(data ?? {}, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowRaw(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
