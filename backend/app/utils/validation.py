def require_fields(data, fields):
    """Return a list of missing required keys from a JSON payload."""
    missing = []
    for field in fields:
        if field not in data or str(data[field]).strip() == "":
            missing.append(field)
    return missing
