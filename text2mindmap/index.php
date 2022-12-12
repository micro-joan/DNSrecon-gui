
<!DOCTYPE html>

<html>

<head>


	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Last-Modified" content="0">
	<meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
	<meta http-equiv="Pragma" content="no-cache">
	
        <meta name="viewport" content="initial-scale=1.0">
	<meta charset="utf-8">
	<link rel="shortcut icon" type="image/png" href="favicon.png">

	<link rel="stylesheet" href="styles/old/customstyles.css">
	<link rel="stylesheet" href="styles/old/jquery-ui-1.10.3.custom.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.minicolors/2.0.4/jquery.minicolors.css"/>
	<script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="styles/app.css">
    <link rel="stylesheet" href="styles/navbar.css">
    <link rel="stylesheet" href="styles/modal.css">
    <link rel="stylesheet" href="styles/document_title.css?v=1">
    <link rel="stylesheet" href="styles/editor.css">
    <link rel="stylesheet" href="styles/viewer.css">
    <link rel="stylesheet" href="styles/pane_resizer.css">
	
	
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.minicolors/2.0.4/jquery.minicolors.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.0.8/d3.min.js?v=1"></script>
    <script src="scripts/old/kineticjs.js"></script>
    <script src="scripts/old/jquery.cookie.min.js"></script>
    <script src="scripts/old/difflib.js"></script>

	<script type="text/javascript">
        var viewcode = "";
        var admincode = "";
        var map = "";
        var savingState = "unsaved";
        var isOldBrowser = false;
        var isIE = false;
        var logged_in = "";
        var userid = "";
        var user = "";
    </script>

    <script src="scripts/old/mindmap.min.js"></script>
    <script src="scripts/unsaved_changes.js"></script>
    <script src="scripts/settings.js"></script>
    <script src="scripts/document_title.js"></script>
    <script src="scripts/app_functions.js"></script>
    <script src="scripts/navbar.js"></script>
    <script src="scripts/modal.js"></script>
    <script src="scripts/pane_resizer.js"></script>
    <script src="scripts/shortcuts.js"></script>
    <script src="scripts/main.js"></script>
    <script src="scripts/data_graph.js"></script>
</head>

<body>
	<div class="wrapper">
	<div class="navbar">
			<ul>
				<li class="navbar-item">
					<div class="document-title-container">
						<input class="document-title-input">
						<div class="document-title-mirror"></div>
					</div>
				</li>
				<li class="navbar-item navbar-button navbar-dropdown">
					<a href="#">File</a>
					<ul class="dropdown-content">
						<li><a href="#" id="file-new"><i class="fa fa-file fa-fw"></i>New<span class="dropdown-shortcut">Ctrl+N</span></a></li>
						<li><a href="#" id="file-open"><i class="fa fa-upload fa-fw"></i>Open...<span class="dropdown-shortcut">Ctrl+O</span></a></li>
						<li><a href="#" id="file-save"><i class="fa fa-save fa-fw"></i>Save...<span class="dropdown-shortcut">Ctrl+S</span></a></li>
						<li><a href="#" id="file-rename"><svg/>Rename...<span class="dropdown-shortcut"></span></a></li>
					</ul>
				</li>
				<li class="navbar-item navbar-button navbar-dropdown">
					<a href="#">Mind Map</a>
					<ul class="dropdown-content">
						<li><a href="#" id="mindmap-lock-all"><i class="fa fa-lock fa-fw"></i>Lock all<span class="dropdown-shortcut"></span></a></li>
						<li><a href="#" id="mindmap-unlock-all"><i class="fa fa-unlock fa-fw"></i>Unlock all<span class="dropdown-shortcut"></span></a></li>
						<li class="dropdown-divider"></li>
						<li><a href="#" id="file-preferences"><i class="fa fa-cogs fa-fw"></i>Preferences</a></li>
					</ul>
				</li>
				<a href="https://twitter.com/TobLoef" class="navbar-item navbar-icon">
					<i class="fab fa-twitter"></i>
				</a>
				<a href="https://github.com/TobLoef/text2mindmap" class="navbar-item navbar-icon">
					<i class="fab fa-github"></i>
				</a>
			</ul>
		</div>
		<div id="pane-container">
			<div id="editor-pane">
                <div id="editor">
                        <div class="collapse-button" id="editor-collapse-button" style="visibility: visible;left: calc(100% - 29px);">
                                <div>
                                    <i class="fa fa-fw fa-chevron-left"></i>
                                </div>
                            </div>
                            <textarea id="textArea" wrap="off" exp></textarea>
                </div>
			</div>
			<div id="viewer-pane">
				<div class="collapse-button" id="viewer-collapse-button" style="visibility: hidden;">
					<div>
						<i class="fa fa-fw fa-chevron-right"></i>
					</div>
				</div>
				<div id="dragbar"></div>
				<div id="viewer-container">
					<div id="stageHolder"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-container">
		<div class="modal" id="settings-modal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<span class="modal-title">Preferences</span>
						<button class="close-button close-modal">&times;</button>
						<ul class="modal-tabs">
							<li data-tab="setting-tab-general" class="active">General</li>
						</ul>
					</div>
					<div class="modal-body">
						<div class="tab-content active" id="setting-tab-general">
                            <form>
								<div class="form-group">
									<label class="control-label">Lock after moving</label>
									<div class="checkbox-control">
										<input type="checkbox" id="lockAfterMoving" checked="true">
										<label for="lockAfterMoving">Freeze a node after it has been moved</label>
									</div>
								</div>
								<div class="form-group">
									<label class="control-label">Color mode</label>
									<select id="coloringMode">
										<option value="2">Branch</option>
										<option value="1">Level</option>
									</select>
								</div>
								<div class="form-group">
									<label class="control-label">Colors</label>
									<div id="colorsdiv" class="form-div"></div>
								</div>
                            </form>
						</div>
					</div>
					<div class="modal-footer">
						<button class="button close-modal">Cancel</button>
						<button class="button dark" id="modal-settings-save">
							<i class="fa fa-save fa-lg"></i>Save
						</button>
					</div>
				</div>
			</div>
			<div class="modal-backdrop close-modal"></div>
		</div>
	</div>
	<input id="file-input" type="file" accept=".txt">

	
</body>

</html>
